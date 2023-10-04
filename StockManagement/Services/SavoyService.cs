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
            SavoyIceCreamMaster_tbl master = new SavoyIceCreamMaster_tbl
            {
                TotalEja = 0,
                TotalPrice = 0,
                TotalNewProduct = 0,
                GrandTotal = 0,
                TotalSalesQuantity = 0,
                GrandTotalAmount = 0,
                TotalDumping = 0,
                TotalReceive = 0,
                TotalRemaining = 0,
                CreatedDate = DateTime.Now
            };
            await _unitOfWork.SavoyIceCreamMaster_tbl.AddAsync(master);
            await _unitOfWork.SaveChangesAsync();

            foreach (var item in savoyIceCreamVM)
            {
                var total = (item.Eja ?? 0) + (item.NewProduct);
                var savoyIceCream = new SavoyIceCream
                {
                    SavoyIceCreamMasterId = master.SavoyIceCreamMasterId,
                    CompanyId = item.CompanyId,
                    ProductId = item.ProductId,
                    Price = item.Price,
                    NewProduct = item.NewProduct,
                    Total = total,
                    Eja = total - (item.SalesQuantity ?? 0),
                    SalesQuantity = item.SalesQuantity,
                    TotalAmount = (item.SalesQuantity)*(item.Price),
                    Dumping = item.Dumping,
                    Receive = item.Receive,
                    Remaining = (item.Dumping ?? 0) - (item.Receive ?? 0),
                    CreatedDate = DateTime.Now
                };
                await _unitOfWork.SavoyIceCream.AddAsync(savoyIceCream);
            }
            await _unitOfWork.SaveChangesAsync();

            master.TotalEja = await _unitOfWork.SavoyIceCream.Queryable.Where(a => a.SavoyIceCreamMasterId == master.SavoyIceCreamMasterId).SumAsync(a => a.Eja);
            master.TotalPrice = await _unitOfWork.SavoyIceCream.Queryable.Where(a => a.SavoyIceCreamMasterId == master.SavoyIceCreamMasterId).SumAsync(a => a.Price);
            master.TotalNewProduct = await _unitOfWork.SavoyIceCream.Queryable.Where(a => a.SavoyIceCreamMasterId == master.SavoyIceCreamMasterId).SumAsync(a => a.NewProduct);
            master.GrandTotal = await _unitOfWork.SavoyIceCream.Queryable.Where(a => a.SavoyIceCreamMasterId == master.SavoyIceCreamMasterId).SumAsync(a => a.Total);
            master.TotalSalesQuantity = await _unitOfWork.SavoyIceCream.Queryable.Where(a => a.SavoyIceCreamMasterId == master.SavoyIceCreamMasterId).SumAsync(a => a.SalesQuantity);
            master.GrandTotalAmount = await _unitOfWork.SavoyIceCream.Queryable.Where(a => a.SavoyIceCreamMasterId == master.SavoyIceCreamMasterId).SumAsync(a => a.TotalAmount);
            master.TotalDumping = await _unitOfWork.SavoyIceCream.Queryable.Where(a => a.SavoyIceCreamMasterId == master.SavoyIceCreamMasterId).SumAsync(a => a.Dumping);
            master.TotalReceive = await _unitOfWork.SavoyIceCream.Queryable.Where(a => a.SavoyIceCreamMasterId == master.SavoyIceCreamMasterId).SumAsync(a => a.Receive);
            master.TotalRemaining = await _unitOfWork.SavoyIceCream.Queryable.Where(a => a.SavoyIceCreamMasterId == master.SavoyIceCreamMasterId).SumAsync(a => a.Remaining);

            _unitOfWork.SavoyIceCreamMaster_tbl.Update(master);
            result = await _unitOfWork.SaveChangesAsync();
            return result;
        }

        public async Task<ActionResult<IEnumerable<SavoyReportDTO>>> GetSavoyReport(int SavoyIceCreamMasterId)
        {
            var savoyIceCreamData = await _unitOfWork.SavoyIceCream.Queryable
                .Where(a => a.SavoyIceCreamMasterId == SavoyIceCreamMasterId)
                .ToListAsync();

            var productData = await _unitOfWork.Product.Queryable.ToListAsync();

            var joinedData = from si in savoyIceCreamData
                             join p in productData on si.ProductId equals p.ProductId
                             select new SavoyReportDTO
                             {
                                 SavoyIceCreamMasterId=si.SavoyIceCreamMasterId,
                                 SavoyIceCreamId = si.SavoyIceCreamId,
                                 CompanyId = si.CompanyId,
                                 ProductId = si.ProductId,
                                 ProductName = p.ProductName,
                                 Eja = si.Eja,
                                 Price = si.Price,
                                 NewProduct = si.NewProduct,
                                 Total = si.Total,
                                 SalesQuantity = si.SalesQuantity,
                                 TotalAmount = si.TotalAmount,
                                 Dumping = si.Dumping,
                                 Receive = si.Receive,
                                 Remaining = si.Remaining,
                                 CreatedDate = si.CreatedDate
                             };

            return joinedData.ToList();
        }


    }
}
