using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagement.DTO;
using StockManagement.Entities;
using StockManagement.Repository;

namespace StockManagement.Services
{
    public class SalesDistributeService
    {
        private readonly UnitOfWork _unitOfWork;

        public SalesDistributeService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ActionResult<IEnumerable<DailyDistributeDataDTO>>> GetSalesDistributeDataPerDay(DateTime StartDate, DateTime EndDate)
        {
            var query = await _unitOfWork.SalesDistribute.Queryable
                        .Where(x => x.CreationTime.Date >= StartDate.Date && x.CreationTime.Date <= EndDate.Date)
                        .Select(query => new DailyDistributeDataDTO
                        {
                            SalesDistributeId = query.SalesDistributeId,
                            ConcernPerson = query.ConcernPerson,
                            TotalReceive = query.TotalReceive,
                            TotalReturn = query.TotalReturn,
                            TotalSales = query.TotalSales,
                            TotalPrice = query.TotalPrice,
                            GrandTotal = query.GrandTotal,
                            CreationTime = query.CreationTime
                        }).ToListAsync();
            return query;
        }

        public async Task<ActionResult<int>> InsertSalesDistributeData(string concernPerson, List<SalesDistributeDTO> salesDistributeVM)
        {
            int result = 0;
            SalesDistribute master = new SalesDistribute
            {
                TotalPrice = 0,
                TotalReceive = 0,
                TotalReturn = 0,
                TotalSales = 0,
                GrandTotal = 0,
                ConcernPerson = concernPerson
            };
            await _unitOfWork.SalesDistribute.AddAsync(master);
            await _unitOfWork.SaveChangesAsync();

            foreach (var item in salesDistributeVM)
            {
                var Details = new SalesDistributeDetail
                {
                    SalesDistributeDetailsId = Guid.NewGuid(),
                    SalesDistributeId = master.SalesDistributeId,
                    ProductId = item.ProductId,
                    Price = item.Price,
                    ReceiveQuantity = item.ReceiveQuantity,
                    ReturnQuantity = item.ReturnQuantity,
                    SalesQuantity = item.SalesQuantity,
                    TotalSalesPrice = item.TotalSalesPrice
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

        public async Task<List<ProductDTO>> GetProduct()
        {
            var data = await _unitOfWork.Product.Queryable
                                       .Where(a => a.IsDeleted == 0 && a.IsActive == 1)
                                       .Select(query => new ProductDTO
                                       {
                                           ProductId = query.ProductId,
                                           ProductName = query.ProductName
                                       }).ToListAsync();
            return data;
        }

        public async Task<ProductPriceDTO> GetProductWisePrice(int ProductID)
        {
            var data = await _unitOfWork.Product.Queryable
                                      .Where(a => a.IsDeleted == 0 && a.IsActive == 1 && a.ProductId == ProductID)
                                      .Select(query => new ProductPriceDTO
                                      {
                                          Price = query.Price ?? 0
                                      }).FirstOrDefaultAsync();
            return data;
        }

        public async Task<SalesDistributeReportDTO> GetSalesDistributeReport(int SalesDistributeId)
        {
            SalesDistributeReportDTO? reportDTO = new SalesDistributeReportDTO();
            var salesdistributeData = await _unitOfWork.SalesDistribute.Queryable
                                    .Where(a => a.SalesDistributeId == SalesDistributeId)
                                    .Select(query => new SalesDistributeReportDTO
                                    {
                                        SalesDistributeId = query.SalesDistributeId,
                                        ConcernPerson = query.ConcernPerson,
                                        CreationTime = query.CreationTime
                                    }).FirstOrDefaultAsync();

            reportDTO = salesdistributeData;

            salesdistributeData.reportDetails = (from si in _unitOfWork.SalesDistributeDetail.Queryable
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
                                               }).ToList();

            return reportDTO;
        }
    }
}
