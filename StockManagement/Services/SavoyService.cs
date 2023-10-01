using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagement.DTO;
using StockManagement.Model;
using StockManagement.Repository;
using System.ComponentModel.Design;
using System.Linq.Expressions;

namespace StockManagement.Services
{
    public class SavoyService
    {
        private readonly UnitOfWork _unitOfWork;

        public SavoyService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<ActionResult<IEnumerable<DailyDataDTO>>> GetSavoyDataPerDay(DateTime StartDate, DateTime EndDate)
        {
            var query = await _unitOfWork.SavoyIceCream.Queryable
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


        public async Task<ActionResult<int>> InsertSavoyData(List<SavoyIceCreamDTO> savoyIceCreamVM)
        {
            int result = 0;
            foreach (var item in savoyIceCreamVM)
            {
                var savoyIceCream = new SavoyIceCream
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
                await _unitOfWork.SavoyIceCream.AddAsync(savoyIceCream);
            }

            result = await _unitOfWork.SaveChangesAsync();
            return result;
        }

        public async Task<ActionResult<IEnumerable<SavoyReportDTO>>> GetSavoyReport(DateTime CreatedDate)
        {
            var savoyIceCreamData = await _unitOfWork.SavoyIceCream.Queryable
                .Where(a => a.CreatedDate.Date == CreatedDate.Date)
                .ToListAsync();

            var productData = await _unitOfWork.Product.Queryable.ToListAsync();

            var joinedData = from si in savoyIceCreamData
                             join p in productData on si.ProductId equals p.ProductId
                             select new SavoyReportDTO
                             {
                                 SavoyIceCreamId= si.SavoyIceCreamId,
                                 CompanyId= si.CompanyId,
                                 ProductId= si.ProductId,
                                 ProductName=p.ProductName,
                                 Eja=si.Eja,
                                 Price=si.Price,
                                 NewProduct=si.NewProduct,
                                 Total=si.Total,
                                 SalesQuantity=si.SalesQuantity,
                                 TotalAmount=si.TotalAmount,
                                 Dumping=si.Dumping,
                                 Receive=si.Receive,
                                 Remaining=si.Remaining,
                                 CreatedDate=si.CreatedDate
                             };

            return joinedData.ToList();
        }


    }
}
