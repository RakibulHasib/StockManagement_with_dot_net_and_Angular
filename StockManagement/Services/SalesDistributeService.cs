using Microsoft.CodeAnalysis;

namespace StockManagement.Services
{
    public class SalesDistributeService
    {
        private readonly UnitOfWork _unitOfWork;

        public SalesDistributeService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public enum DailyDistributeStatus
        {
            NotCreated = 0,
            Created,
            StockComplete
        }

        public enum StockType
        {
            StockIn = 0,
            StockOut,
            ReturnStockIn
        }

        public async Task<ActionResult<IEnumerable<DailyDistributeDataDTO>>> GetSalesDistributeDataPerDay(int ConcernPersonID, int CompanyId, DateTime StartDate, DateTime EndDate)
        {
            var query = await (from sd in _unitOfWork.SalesDistribute.Queryable.Where(a => a.IsDeleted == 0)
                               join cp in _unitOfWork.ConcernPerson.Queryable.Where(a => a.IsDeleted == 0) on sd.ConcernPersonId equals cp.ConcernPersonId
                               where sd.CreationTime.Date >= StartDate.Date && sd.CreationTime.Date <= EndDate.Date
                                      && cp.ConcernPersonId == (ConcernPersonID == 0 ? cp.ConcernPersonId : ConcernPersonID)
                                      && sd.CompanyId == (CompanyId == 0 ? sd.CompanyId : CompanyId)
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

        public async Task<ActionResult<int>> InsertSalesDistributeData(int ConcernPersonID, int companyId, DateTime distributionTime, List<SalesDistributeDTO> productDto)
        {
            int result = 0;
            List<SalesDistributeDetail> distributeDetails = new();
            List<Product> products = new();

            foreach (var item in productDto)
            {
                var remaining = (item.ReceiveQuantity ?? 0) - (item.SalesQuantity ?? 0);
                var Details = new SalesDistributeDetail
                {
                    SalesDistributeDetailsId = Guid.NewGuid(),
                    ProductId = item.ProductId,
                    Price = item.Price,
                    ReceiveQuantity = item.ReceiveQuantity ?? 0,
                    ReturnQuantity = remaining,
                    SalesQuantity = item.SalesQuantity ?? 0,
                    TotalSalesPrice = item.TotalSalesPrice,
                    IsDeleted = 0,
                    CreationTime = distributionTime
                };
                distributeDetails.Add(Details);
            }

            SalesDistribute salesDistrbute = new SalesDistribute
            {
                TotalPrice = distributeDetails.Sum(x => x.Price),
                TotalReceive = distributeDetails.Sum(x => x.ReceiveQuantity),
                TotalReturn = distributeDetails.Sum(x => x.ReturnQuantity),
                TotalSales = distributeDetails.Sum(x => x.SalesQuantity),
                GrandTotal = distributeDetails.Sum(x => x.TotalSalesPrice),
                ConcernPersonId = ConcernPersonID,
                CompanyId = companyId,
                CreationTime = distributionTime,
                IsDeleted = 0,
                Status = (int)DailyDistributeStatus.Created
            };

            var productIds = distributeDetails.Select(x => x.ProductId).ToList();

            products = await _unitOfWork.Product.Queryable
            .Where(a => productIds.Contains(a.ProductId)).ToListAsync();

            var transaction = await _unitOfWork.BeginTransactionAsync();

            try
            {
                foreach (var product in distributeDetails)
                {
                    product.SalesDistribute = salesDistrbute;

                    var productData = products.FirstOrDefault(x => x.ProductId == product.ProductId);
                    var oldStock = productData.StockQuantity;

                    if (productData != null)
                    {
                        productData.StockQuantity -= product?.SalesQuantity == null ? 0 : product.SalesQuantity;
                        products.Add(productData);
                    }
                    if (product.ReceiveQuantity > 0)
                    {
                        var salesStockLog = new ProductStockLog
                        {
                            Id = Guid.NewGuid(),
                            ProductId = product.ProductId,
                            NewQuantity = oldStock - (product?.ReceiveQuantity == null ? 0 : product.ReceiveQuantity),
                            PreviousQuantity = oldStock,
                            StockType = (int)StockType.StockOut
                        };
                        await _unitOfWork.ProductStockLog.AddRawAsync(salesStockLog);
                        await _unitOfWork.SaveChangesAsync();
                        oldStock = salesStockLog.NewQuantity;
                        productData.LastStockLogId = salesStockLog.Id;

                    }
                    if (product.ReturnQuantity > 0)
                    {
                        var returnStockLog = new ProductStockLog
                        {
                            Id = Guid.NewGuid(),
                            ProductId = product.ProductId,
                            NewQuantity = oldStock + (product?.ReturnQuantity == null ? 0 : product.ReturnQuantity),
                            PreviousQuantity = oldStock,
                            StockType = (int)StockType.ReturnStockIn,
                            ConcernPersonId = salesDistrbute.ConcernPersonId
                        };
                        await _unitOfWork.ProductStockLog.AddRawAsync(returnStockLog);
                        await _unitOfWork.SaveChangesAsync();
                        productData.LastStockLogId = returnStockLog.Id;
                    }

                }

                await _unitOfWork.SalesDistribute.AddRawAsync(salesDistrbute);
                await _unitOfWork.SalesDistributeDetail.AddRangeRawAsync(distributeDetails);
                _unitOfWork.Product.UpdateRangeAsync(products);

                await _unitOfWork.SaveChangesAsync();

                await transaction.CommitAsync();

                return result;
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();

                throw new InvalidOperationException("Failed to insert");
            }
        }

        public async Task<List<DailyDistributorStatusDTO>> GetDistributorStatus(DateTime date)
        {
            var concernPersonsWithDetails =
                await (from cp in _unitOfWork.ConcernPerson.Queryable where cp.IsDeleted == 0
                       join cm in _unitOfWork.ConcernUserCompanyMapping.Queryable on cp.ConcernPersonId equals cm.ConcernPersonId
                       join c in _unitOfWork.Company.Queryable on cm.CompanyId equals c.CompanyId where c.IsDeleted == 0
                       join sd in _unitOfWork.SalesDistribute.Queryable.Where(a => a.CreationTime.Date == date.Date) on new { cm.ConcernPersonId, cm.CompanyId } equals new { sd.ConcernPersonId, sd.CompanyId } into sdGroup
                       from sd in sdGroup.DefaultIfEmpty()
                       select new
                       {
                           cp.ConcernPersonId,
                           cp.ConcernPersonName,
                           c.CompanyName,
                           Status = sd.Status == null ? 0 : sd.Status,
                       }).ToListAsync();

            var groupedData =
                concernPersonsWithDetails.GroupBy(x => new { x.ConcernPersonId, x.ConcernPersonName })
                .Select(g => new DailyDistributorStatusDTO
                {
                    ConcernPersonId = g.Key.ConcernPersonId,
                    ConcernPersonName = g.Key.ConcernPersonName,
                    StatusDetail = g.Where(x => x.CompanyName != null).Select(x => new DistributorStatusDetail
                    {
                        CompanyName = x.CompanyName,
                        Status = x?.Status ?? Convert.ToInt32(DailyDistributeStatus.NotCreated)
                    }).ToList()
                }).ToList();

            return groupedData;
        }

        public async Task<SalesDistributeReportDTO> GetSalesDistributeReport(int SalesDistributeId)
        {
            SalesDistributeReportDTO? reportDTO = new SalesDistributeReportDTO();
            var salesdistributeData = await (from sd in _unitOfWork.SalesDistribute.Queryable.Where(a => a.IsDeleted == 0)
                                             join cp in _unitOfWork.ConcernPerson.Queryable.Where(a => a.IsDeleted == 0) on sd.ConcernPersonId equals           cp.ConcernPersonId
                                             join c in _unitOfWork.Company.Queryable.Where(a => a.IsDeleted == 0) on sd.CompanyId equals c.CompanyId
                                             where sd.SalesDistributeId == SalesDistributeId
                                             select new SalesDistributeReportDTO
                                             {
                                                 SalesDistributeId = sd.SalesDistributeId,
                                                 ConcernPerson = cp.ConcernPersonName,
                                                 CompanyName = c.CompanyName,
                                                 CreationTime = sd.CreationTime
                                             }).FirstOrDefaultAsync();

            reportDTO = salesdistributeData;

            salesdistributeData.reportDetails = await (from si in _unitOfWork.SalesDistributeDetail.Queryable.Where(a => a.IsDeleted == 0)
                                                       join p in _unitOfWork.Product.Queryable on si.ProductId equals p.ProductId
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

        public async Task<List<ProductInfoByConcernPersonDTO>> GetProductInfoByCompany(int companyId)
        {
            var data = await _unitOfWork.Product.Queryable
                .Where(x => x.CompanyId == companyId
                            && x.IsDeleted == 0)
                .Select(x => new ProductInfoByConcernPersonDTO
                {
                    ProductId = x.ProductId,
                    ProductName = x.ProductName,
                    Price = x.Price,
                    Stock = x.StockQuantity
                }).ToListAsync();
            return data;
        }
        public async Task<SalesDistributeAvailabityDto?> GetAvailableDistributeForConcernPerson(int concernPersonId, int companyId)
        {
            var data = await _unitOfWork.SalesDistribute.Queryable
                .Where(x => x.ConcernPersonId == concernPersonId && x.CompanyId == companyId && x.IsDeleted == 0)
                .OrderByDescending(x => x.CreationTime)
                .Select(x => new LastSalesDistributeInfoDto
                {
                    LastDistributeStatus = x.Status,
                    LastDistributeDay = x.CreationTime,
                }).FirstOrDefaultAsync();

            return new SalesDistributeAvailabityDto
            {
                Today = DateTime.Now,
                LastDistribute = data
            };
        }
    }
}
