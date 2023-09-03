using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagement.DTO;
using StockManagement.Model;
using StockManagement.Repository;

namespace StockManagement.Services
{
    public class KaziFarmFoodService
    {
        private readonly UnitOfWork _unitOfWork;

        public KaziFarmFoodService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<ActionResult<IEnumerable<DailyDataDTO>>> GetKaziFarmDataPerDay(DateTime StartDate, DateTime EndDate)
        {
            var query = await _unitOfWork.KaziFarmFood.Queryable
                .Where(x => x.CreatedDate.Date >= StartDate.Date && x.CreatedDate.Date <= EndDate.Date)
                .ToListAsync();

            var groupedQuery = query
                .GroupBy(x => new
                {
                    Date = x.CreatedDate.Date,
                    TimeWithoutSeconds = x.CreatedDate.ToString("HH:mm:ss").Substring(0, 5)
                })
                .Select(group => new DailyDataDTO
                {
                    CreatedDate = group.Max(x => x.CreatedDate),
                    TotalSalesQuantity = group.Sum(x => x.SalesQuantity ?? 0),
                    TotalAmount = group.Sum(x => x.TotalAmount ?? 0)
                })
                .ToList();

            return groupedQuery;
        }


        public async Task<ActionResult<int>> InserKaziFarmtData(List<KaziFarmFoodDTO> kazifarmIceCreamVM)
        {
            int result = 0;
            foreach (var item in kazifarmIceCreamVM)
            {
                var kazifarmfood = new KaziFarmFood
                {
                    CompanyId = item.CompanyId,
                    ProductId = item.ProductId,
                    Eja = (item.Total ?? 0) - (item.SalesQuantity ?? 0),
                    Price = item.Price,
                    NewProduct = item.NewProduct,
                    Total = item.Total,
                    SalesQuantity = item.SalesQuantity,
                    TotalAmount = item.TotalAmount,
                    Dumping = item.Dumping,
                    Receive = item.Receive,
                    Remaining = item.Remaining,
                    CreatedDate = DateTime.Now
                };
                await _unitOfWork.KaziFarmFood.AddAsync(kazifarmfood);
            }

            result = await _unitOfWork.SaveChangesAsync();
            return result;
        }
    }
}
