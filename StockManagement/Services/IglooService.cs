using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagement.DTO;
using StockManagement.Model;
using StockManagement.Repository;

namespace StockManagement.Services
{
    //public class IglooService
    //{
    //    private readonly UnitOfWork _unitOfWork;

    //    public IglooService(UnitOfWork unitOfWork)
    //    {
    //        _unitOfWork = unitOfWork;
    //    }
    //    public async Task<ActionResult<IEnumerable<DailyDataDTO>>> GetIglooDataPerDay(DateTime StartDate, DateTime EndDate)
    //    {
    //        var query = await _unitOfWork.IglooIceCreamMaster_tbl.Queryable.Where(x => x.CreatedDate.Date >= StartDate.Date && x.CreatedDate.Date <= EndDate.Date)
    //                                                                     .Select(query => new DailyDataDTO
    //                                                                     {
    //                                                                         CreatedDate = query.CreatedDate,
    //                                                                         TotalSalesQuantity = query.TotalSalesQuantity ?? 0,
    //                                                                         TotalAmount = query.GrandTotalAmount ?? 0
    //                                                                     }).ToListAsync();
    //        return query;
    //    }


    //    public async Task<ActionResult<int>> InsertIglooData(List<IglooIceCreamDTO> iglooIceCreamVM)
    //    {
    //        int result = 0;
    //        IglooIceCreamMaster_tbl master = new IglooIceCreamMaster_tbl
    //        {
    //            TotalEja = 0,
    //            TotalPrice = 0,
    //            TotalNewProduct = 0,
    //            GrandTotal = 0,
    //            TotalSalesQuantity = 0,
    //            GrandTotalAmount = 0,
    //            TotalDumping = 0,
    //            TotalReceive = 0,
    //            TotalRemaining = 0,
    //            CreatedDate = DateTime.Now
    //        };
    //        await _unitOfWork.IglooIceCreamMaster_tbl.AddAsync(master);
    //        await _unitOfWork.SaveChangesAsync();
    //        foreach (var item in iglooIceCreamVM)
    //        {
    //            var total = (item.Eja ?? 0) + (item.NewProduct);
    //            var iglooIceCream = new IglooIceCream
    //            {
    //                IglooIceCreamMasterId = master.IglooIceCreamMasterId,
    //                CompanyId = item.CompanyId,
    //                ProductId = item.ProductId,
    //                Price = item.Price,
    //                NewProduct = item.NewProduct,
    //                Total = total,
    //                Eja = total - (item.SalesQuantity ?? 0),
    //                SalesQuantity = item.SalesQuantity,
    //                TotalAmount = (item.SalesQuantity) * (item.Price),
    //                Dumping = item.Dumping,
    //                Receive = item.Receive,
    //                Remaining = (item.Dumping ?? 0) - (item.Receive ?? 0),
    //                CreatedDate = DateTime.Now
    //            };
    //            await _unitOfWork.IglooIceCream.AddAsync(iglooIceCream);
    //        }
    //        master.TotalEja = await _unitOfWork.IglooIceCream.Queryable.Where(a => a.IglooIceCreamMasterId == master.IglooIceCreamMasterId).SumAsync(a => a.Eja);
    //        master.TotalPrice = await _unitOfWork.IglooIceCream.Queryable.Where(a => a.IglooIceCreamMasterId == master.IglooIceCreamMasterId).SumAsync(a => a.Price);
    //        master.TotalNewProduct = await _unitOfWork.IglooIceCream.Queryable.Where(a => a.IglooIceCreamMasterId == master.IglooIceCreamMasterId).SumAsync(a => a.NewProduct);
    //        master.GrandTotal = await _unitOfWork.IglooIceCream.Queryable.Where(a => a.IglooIceCreamMasterId == master.IglooIceCreamMasterId).SumAsync(a => a.Total);
    //        master.TotalSalesQuantity = await _unitOfWork.IglooIceCream.Queryable.Where(a => a.IglooIceCreamMasterId == master.IglooIceCreamMasterId).SumAsync(a => a.SalesQuantity);
    //        master.GrandTotalAmount = await _unitOfWork.IglooIceCream.Queryable.Where(a => a.IglooIceCreamMasterId == master.IglooIceCreamMasterId).SumAsync(a => a.TotalAmount);
    //        master.TotalDumping = await _unitOfWork.IglooIceCream.Queryable.Where(a => a.IglooIceCreamMasterId == master.IglooIceCreamMasterId).SumAsync(a => a.Dumping);
    //        master.TotalReceive = await _unitOfWork.IglooIceCream.Queryable.Where(a => a.IglooIceCreamMasterId == master.IglooIceCreamMasterId).SumAsync(a => a.Receive);
    //        master.TotalRemaining = await _unitOfWork.IglooIceCream.Queryable.Where(a => a.IglooIceCreamMasterId == master.IglooIceCreamMasterId).SumAsync(a => a.Remaining);

    //        _unitOfWork.IglooIceCreamMaster_tbl.Update(master);

    //        result = await _unitOfWork.SaveChangesAsync();
    //        return result;
    //    }

    //    public async Task<ActionResult<IEnumerable<IglooReportDTO>>> GetIglooReport(int IglooIceCreamMasterId)
    //    {
    //        var iglooIceCreamData = await _unitOfWork.IglooIceCream.Queryable
    //            .Where(a => a.IglooIceCreamMasterId == IglooIceCreamMasterId)
    //            .ToListAsync();

    //        var productData = await _unitOfWork.Product.Queryable.ToListAsync();

    //        var joinedData = from si in iglooIceCreamData
    //                         join p in productData on si.ProductId equals p.ProductId
    //                         select new IglooReportDTO
    //                         {
    //                             IglooIceCreamMasterId = si.IglooIceCreamMasterId,
    //                             IglooIceCreamId = si.IglooIceCreamId,
    //                             CompanyId = si.CompanyId,
    //                             ProductId = si.ProductId,
    //                             ProductName = p.ProductName,
    //                             Eja = si.Eja,
    //                             Price = si.Price,
    //                             NewProduct = si.NewProduct,
    //                             Total = si.Total,
    //                             SalesQuantity = si.SalesQuantity,
    //                             TotalAmount = si.TotalAmount,
    //                             Dumping = si.Dumping,
    //                             Receive = si.Receive,
    //                             Remaining = si.Remaining,
    //                             CreatedDate = si.CreatedDate
    //                         };

    //        return joinedData.ToList();
    //    }
    //}
}
