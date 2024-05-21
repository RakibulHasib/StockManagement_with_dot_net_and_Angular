namespace StockManagement.Services
{
    public class SalesDistributeService
    {
        private readonly UnitOfWork _unitOfWork;

        public SalesDistributeService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        enum DailyDistributeStatus
        {
            NotComplete = 0,
            Complete,
            Skip
        }

        public async Task<ActionResult<IEnumerable<DailyDistributeDataDTO>>> GetSalesDistributeDataPerDay(int ConcernPersonID, DateTime StartDate, DateTime EndDate)
        {
            var query = await (from sd in _unitOfWork.SalesDistribute.Queryable.Where(a => a.IsDeleted == 0)
                               join cp in _unitOfWork.ConcernPerson.Queryable.Where(a => a.IsDeleted == 0) on sd.ConcernPersonId equals cp.ConcernPersonId
                               where sd.CreationTime.Date >= StartDate.Date && sd.CreationTime.Date <= EndDate.Date
                                      && cp.ConcernPersonId == (ConcernPersonID == 0 ? cp.ConcernPersonId : ConcernPersonID)
                               select new DailyDistributeDataDTO
                               {
                                   SalesDistributeId = sd.SalesDistributeId,
                                   ConcernPerson = cp.ConcernPersonName,
                                   TotalReceive = sd.TotalReceive,
                                   TotalReturn = sd.TotalReturn,
                                   TotalSales = sd.TotalSales,
                                   TotalPrice = sd.TotalPrice,
                                   GrandTotal = sd.GrandTotal,
                                   CreationTime = sd.CreationTime
                               }).OrderByDescending(a => a.SalesDistributeId).ToListAsync();
            return query;
        }

        public async Task<SalesDistributeDataDto> GetDistributeDataByID(int SalesDistributeId)
        {
            var master = await _unitOfWork.SalesDistribute.Queryable.Where(a => a.IsDeleted == 0)
                .Where(a => a.SalesDistributeId == SalesDistributeId)
                .Select(query => new SalesDistributeDataDto
                {
                    ConcernPersonID = query.ConcernPersonId
                }).FirstOrDefaultAsync();

            master.salesDistribute = await _unitOfWork.SalesDistributeDetail.Queryable
                .Where(a => a.SalesDistributeId == SalesDistributeId && a.IsDeleted == 0)
                .Select(data => new SalesDistributeDTO
                {
                    SalesDistributeDetailsId = data.SalesDistributeDetailsId,
                    SalesDistributeId = data.SalesDistributeId,
                    ProductId = data.ProductId,
                    Price = data.Price,
                    ReceiveQuantity = data.ReceiveQuantity,
                    ReturnQuantity = 0,
                    SalesQuantity = data.SalesQuantity,
                    TotalSalesPrice = data.TotalSalesPrice,
                    CreationTime = data.CreationTime,
                    IsDeleted = data.IsDeleted
                }).ToListAsync();

            foreach (var item in master.salesDistribute)
            {
                item.ReturnQuantity = await GetProductWiseRemainingSkipOne(item.ProductId, master.ConcernPersonID);
            }

            return master;
        }

        public async Task<ActionResult<int>> InsertSalesDistributeData(int ConcernPersonID, List<SalesDistributeDTO> salesDistributeVM)
        {
            int result = 0;
            SalesDistribute master = new SalesDistribute
            {
                TotalPrice = 0,
                TotalReceive = 0,
                TotalReturn = 0,
                TotalSales = 0,
                GrandTotal = 0,
                ConcernPersonId = ConcernPersonID,
                IsDeleted = 0,
                Status = Convert.ToInt32(DailyDistributeStatus.Complete)
            };
            await _unitOfWork.SalesDistribute.AddAsync(master);
            await _unitOfWork.SaveChangesAsync();

            foreach (var item in salesDistributeVM)
            {
                var remaining = ((item.ReceiveQuantity ?? 0) + (item.ReturnQuantity ?? 0) - item.SalesQuantity ?? 0);
                var Details = new SalesDistributeDetail
                {
                    SalesDistributeDetailsId = Guid.NewGuid(),
                    SalesDistributeId = master.SalesDistributeId,
                    ProductId = item.ProductId,
                    Price = item.Price,
                    ReceiveQuantity = item.ReceiveQuantity ?? 0,
                    ReturnQuantity = remaining,
                    SalesQuantity = item.SalesQuantity ?? 0,
                    TotalSalesPrice = item.TotalSalesPrice,
                    IsDeleted = 0
                };
                await _unitOfWork.SalesDistributeDetail.AddAsync(Details);
            }
            await _unitOfWork.SaveChangesAsync();

            master.TotalPrice = await _unitOfWork.SalesDistributeDetail.Queryable.Where(a => a.SalesDistributeId == master.SalesDistributeId).SumAsync(a => a.Price);
            master.TotalReceive = await _unitOfWork.SalesDistributeDetail.Queryable.Where(a => a.SalesDistributeId == master.SalesDistributeId).SumAsync(a => a.ReceiveQuantity);
            master.TotalReturn = await _unitOfWork.SalesDistributeDetail.Queryable.Where(a => a.SalesDistributeId == master.SalesDistributeId).SumAsync(a => a.ReturnQuantity);
            master.TotalSales = await _unitOfWork.SalesDistributeDetail.Queryable.Where(a => a.SalesDistributeId == master.SalesDistributeId).SumAsync(a => a.SalesQuantity);
            master.GrandTotal = await _unitOfWork.SalesDistributeDetail.Queryable.Where(a => a.SalesDistributeId == master.SalesDistributeId).SumAsync(a => a.TotalSalesPrice);

            _unitOfWork.SalesDistribute.Update(master);
            result = await _unitOfWork.SaveChangesAsync();
            return result;
        }

        public async Task<List<DailyDistributorStatusDTO>> GetDistributorStatus()
        {
            var data = await (from cp in _unitOfWork.ConcernPerson.Queryable.Where(a => a.IsDeleted == 0)
                              let status = _unitOfWork.SalesDistribute.Queryable.Where(a => a.CreationTime.Date == DateTime.Now.Date && a.ConcernPersonId == cp.ConcernPersonId && a.IsDeleted == 0).Select(a => a.Status).FirstOrDefault()
                              select new DailyDistributorStatusDTO
                              {
                                  ConcernPersonId = cp.ConcernPersonId,
                                  ConcernPersonName = cp.ConcernPersonName,
                                  Status = status != null ? status : Convert.ToInt32(DailyDistributeStatus.NotComplete)
                              }).ToListAsync();
            return data;
        }

        public async Task<int> InsertSkipConcerPersonDistribution(int ConcernPersonID)
        {
            int result = 0;
            SalesDistribute master = new SalesDistribute
            {
                TotalPrice = 0,
                TotalReceive = 0,
                TotalReturn = 0,
                TotalSales = 0,
                GrandTotal = 0,
                ConcernPersonId = ConcernPersonID,
                IsDeleted = 0,
                Status = Convert.ToInt32(DailyDistributeStatus.Skip)
            };
            await _unitOfWork.SalesDistribute.AddAsync(master);
            await _unitOfWork.SaveChangesAsync();
            return result;
        }

        public async Task<List<ProductDTO>> GetProduct()
        {
            var data = await (from p in _unitOfWork.Product.Queryable.Where(a => a.IsDeleted == 0)
                              join c in _unitOfWork.Company.Queryable.Where(a => a.IsDeleted == 0) on p.CompanyId equals c.CompanyId
                              select new ProductDTO
                              {
                                  ProductId = p.ProductId,
                                  ProductName = p.ProductName + " (" + c.CompanyName + "),"
                              }).ToListAsync();
            return data;
        }

        public async Task<List<ProductDTO>> GetProductByCompanyId(int companyId)
        {
            var data = await _unitOfWork.Product.Queryable
                .Where(x => x.IsDeleted == 0 && x.CompanyId == companyId)
                .Select(x => new ProductDTO
                {
                    ProductId = x.ProductId,
                    ProductName = x.ProductName
                }).ToListAsync();

            return data;
        }


        public async Task<ProductPriceDTO> GetProductWisePrice(int ProductID)
        {
            var data = await _unitOfWork.Product.Queryable
                                      .Where(a => a.IsDeleted == 0 && a.IsActive == 1 && a.ProductId == ProductID && a.IsDeleted == 0)
                                      .Select(query => new ProductPriceDTO
                                      {
                                          Price = query.Price ?? 0
                                      }).FirstOrDefaultAsync();
            return data;
        }

        public async Task<int> GetProductWiseRemaining(int ProductID, int ConcernPersonID)
        {
            var SalesDistributeId = await _unitOfWork.SalesDistribute.Queryable
                .Where(a => a.ConcernPersonId == ConcernPersonID && a.IsDeleted == 0)
                .OrderByDescending(a => a.SalesDistributeId)
                .Select(a => a.SalesDistributeId)
                .FirstOrDefaultAsync();

            int RemainQuantity = 0;

            if (SalesDistributeId != 0)
            {
                RemainQuantity = await _unitOfWork.SalesDistributeDetail.Queryable
                    .Where(a => a.ProductId == ProductID && a.SalesDistributeId == SalesDistributeId && a.IsDeleted == 0)
                    .Select(a => a.ReturnQuantity)
                    .FirstOrDefaultAsync();
            }

            return RemainQuantity;
        }
        public async Task<int> GetProductWiseRemainingSkipOne(int ProductID, int ConcernPersonID)
        {
            var SalesDistributeId = await _unitOfWork.SalesDistribute.Queryable
                .Where(a => a.ConcernPersonId == ConcernPersonID && a.IsDeleted == 0)
                .OrderByDescending(a => a.SalesDistributeId)
                .Skip(1)
                .Select(a => a.SalesDistributeId)
                .FirstOrDefaultAsync();

            int RemainQuantity = 0;

            if (SalesDistributeId != 0)
            {
                RemainQuantity = await _unitOfWork.SalesDistributeDetail.Queryable
                    .Where(a => a.ProductId == ProductID && a.SalesDistributeId == SalesDistributeId && a.IsDeleted == 0)
                    .Select(a => a.ReturnQuantity)
                    .FirstOrDefaultAsync();
            }

            return RemainQuantity;
        }

        public async Task<SalesDistributeReportDTO> GetSalesDistributeReport(int SalesDistributeId)
        {
            SalesDistributeReportDTO? reportDTO = new SalesDistributeReportDTO();
            var salesdistributeData = await (from sd in _unitOfWork.SalesDistribute.Queryable.Where(a => a.IsDeleted == 0)
                                             join cp in _unitOfWork.ConcernPerson.Queryable.Where(a => a.IsDeleted == 0) on sd.ConcernPersonId equals cp.ConcernPersonId
                                             where sd.SalesDistributeId == SalesDistributeId
                                             select new SalesDistributeReportDTO
                                             {
                                                 SalesDistributeId = sd.SalesDistributeId,
                                                 ConcernPerson = cp.ConcernPersonName,
                                                 CreationTime = sd.CreationTime
                                             }).FirstOrDefaultAsync();

            reportDTO = salesdistributeData;

            salesdistributeData.reportDetails = await (from si in _unitOfWork.SalesDistributeDetail.Queryable.Where(a => a.IsDeleted == 0)
                                                       join p in _unitOfWork.Product.Queryable.Where(a => a.IsDeleted == 0) on si.ProductId equals p.ProductId
                                                       where si.SalesDistributeId == SalesDistributeId
                                                       select new SalesDistributeReportDetail
                                                       {
                                                           SalesDistributeId = si.SalesDistributeId,
                                                           SalesDistributeDetailsId = si.SalesDistributeDetailsId,
                                                           ProductId = si.ProductId,
                                                           ProductName = p.ProductName,
                                                           Price = si.Price,
                                                           ReceiveQuantity = si.ReceiveQuantity,
                                                           ReturnQuantity = si.ReturnQuantity,
                                                           SalesQuantity = si.SalesQuantity,
                                                           TotalSalesPrice = si.TotalSalesPrice,
                                                           CreationTime = si.CreationTime
                                                       }).ToListAsync();

            return reportDTO;
        }

        public async Task<bool> CheckTodayConcernPersonDistribution(int ConcernPersonId)
        {
            var data = await _unitOfWork.SalesDistribute.Queryable
                .Where(a => a.CreationTime.Date == DateTime.Now.Date && a.ConcernPersonId == ConcernPersonId && a.IsDeleted == 0)
                .Select(a => a.ConcernPersonId)
                .FirstOrDefaultAsync();

            return data != 0;
        }

        public async Task<int> DeleteDistribution(int SalesDistributeId)
        {
            int result = 0;
            var master = await _unitOfWork.SalesDistribute.Queryable.Where(a => a.SalesDistributeId == SalesDistributeId).FirstOrDefaultAsync();
            if (master != null)
            {
                master.IsDeleted = 1;
                _unitOfWork.SalesDistribute.Update(master);
                await _unitOfWork.SaveChangesAsync();

                var detail = await _unitOfWork.SalesDistributeDetail.Queryable.Where(a => a.SalesDistributeId == SalesDistributeId).ToListAsync();
                foreach (var item in detail)
                {
                    item.IsDeleted = 1;
                    _unitOfWork.SalesDistributeDetail.Update(item);
                }
                result = await _unitOfWork.SaveChangesAsync();
            }
            return result;
        }

    }
}
