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
            var query = await _unitOfWork.KaziFarmFoodMaster_tbl.Queryable.Where(x => x.CreatedDate.Date >= StartDate.Date && x.CreatedDate.Date <= EndDate.Date)
                                                              .Select(query => new DailyDataDTO
                                                              {
                                                                  CreatedDate = query.CreatedDate,
                                                                  TotalSalesQuantity = query.TotalSalesQuantity ?? 0,
                                                                  TotalAmount = query.GrandTotalAmount ?? 0
                                                              }).ToListAsync();
            return query;
        }


        public async Task<ActionResult<int>> InserKaziFarmtData(List<KaziFarmFoodDTO> kazifarmIceCreamVM)
        {
            int result = 0;
            KaziFarmFoodMaster_tbl master = new KaziFarmFoodMaster_tbl
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
            await _unitOfWork.KaziFarmFoodMaster_tbl.AddAsync(master);
            await _unitOfWork.SaveChangesAsync();
            foreach (var item in kazifarmIceCreamVM)
            {
                var total = (item.Eja ?? 0) + (item.NewProduct);
                var kazifarmfood = new KaziFarmFood
                {
                    KaziFarmFoodMasterId=master.KaziFarmFoodMasterId,
                    CompanyId = item.CompanyId,
                    ProductId = item.ProductId,
                    Price = item.Price,
                    NewProduct = item.NewProduct,
                    Total = total,
                    Eja = total - (item.SalesQuantity ?? 0),
                    SalesQuantity = item.SalesQuantity,
                    TotalAmount = (item.SalesQuantity) * (item.Price),
                    Dumping = item.Dumping,
                    Receive = item.Receive,
                    Remaining = (item.Dumping ?? 0) - (item.Receive ?? 0),
                    CreatedDate = DateTime.Now
                };
                await _unitOfWork.KaziFarmFood.AddAsync(kazifarmfood);
            }

            master.TotalEja = await _unitOfWork.KaziFarmFood.Queryable.Where(a => a.KaziFarmFoodMasterId == master.KaziFarmFoodMasterId).SumAsync(a => a.Eja);
            master.TotalPrice = await _unitOfWork.KaziFarmFood.Queryable.Where(a => a.KaziFarmFoodMasterId == master.KaziFarmFoodMasterId).SumAsync(a => a.Price);
            master.TotalNewProduct = await _unitOfWork.KaziFarmFood.Queryable.Where(a => a.KaziFarmFoodMasterId == master.KaziFarmFoodMasterId).SumAsync(a => a.NewProduct);
            master.GrandTotal = await _unitOfWork.KaziFarmFood.Queryable.Where(a => a.KaziFarmFoodMasterId == master.KaziFarmFoodMasterId).SumAsync(a => a.Total);
            master.TotalSalesQuantity = await _unitOfWork.KaziFarmFood.Queryable.Where(a => a.KaziFarmFoodMasterId == master.KaziFarmFoodMasterId).SumAsync(a => a.SalesQuantity);
            master.GrandTotalAmount = await _unitOfWork.KaziFarmFood.Queryable.Where(a => a.KaziFarmFoodMasterId == master.KaziFarmFoodMasterId).SumAsync(a => a.TotalAmount);
            master.TotalDumping = await _unitOfWork.KaziFarmFood.Queryable.Where(a => a.KaziFarmFoodMasterId == master.KaziFarmFoodMasterId).SumAsync(a => a.Dumping);
            master.TotalReceive = await _unitOfWork.KaziFarmFood.Queryable.Where(a => a.KaziFarmFoodMasterId == master.KaziFarmFoodMasterId).SumAsync(a => a.Receive);
            master.TotalRemaining = await _unitOfWork.KaziFarmFood.Queryable.Where(a => a.KaziFarmFoodMasterId == master.KaziFarmFoodMasterId).SumAsync(a => a.Remaining);

            _unitOfWork.KaziFarmFoodMaster_tbl.Update(master);

            result = await _unitOfWork.SaveChangesAsync();
            return result;
        }


        public async Task<ActionResult<IEnumerable<KaziFarmReportDTO>>> GetKaziFarmReport(int KaziFarmFoodMasterId)
        {
            var kaziFarmData = await _unitOfWork.KaziFarmFood.Queryable
                .Where(a => a.KaziFarmFoodMasterId == KaziFarmFoodMasterId)
                .ToListAsync();

            var productData = await _unitOfWork.Product.Queryable.ToListAsync();

            var joinedData = from si in kaziFarmData
                             join p in productData on si.ProductId equals p.ProductId
                             select new KaziFarmReportDTO
                             {
                                 KaziFarmFoodMasterId = si.KaziFarmFoodMasterId,
                                 KaziFarmFoodId = si.KaziFarmFoodId,
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
