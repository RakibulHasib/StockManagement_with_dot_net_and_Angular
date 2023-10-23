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
                            TotalPrice = query.TotalPrice,
                            TotalReceive = query.TotalReceive,
                            TotalReturn = query.TotalReturn,
                            TotalSales=query.TotalSales,
                            GrandTotal= query.GrandTotal,
                            ConcernPerson=query.ConcernPerson,
                            CreationTime=query.CreationTime
                        }).ToListAsync();
            return query;
        }

        public async Task<ActionResult<int>> InsertSalesDistributeData(List<SalesDistributeDTO> salesDistributeVM)
        {
            int result = 0;
            SalesDistribute master = new SalesDistribute
            {
                TotalPrice = 0,
                TotalReceive = 0,
                TotalReturn=0,
                TotalSales = 0,
                GrandTotal = 0,
                ConcernPerson = salesDistributeVM[0].ConcernPerson,
                CreationTime= DateTime.Now,
                IsDeleted=0
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
                    ReceiveQuantity= item.ReceiveQuantity,
                    ReturnQuantity = item.ReturnQuantity,
                    SalesQuantity = item.SalesQuantity,
                    TotalSalesPrice= item.TotalSalesPrice,
                    CreationTime= DateTime.Now,
                    IsDeleted=0
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
    }
}
