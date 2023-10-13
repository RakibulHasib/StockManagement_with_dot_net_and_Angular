using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagement.DTO;
using StockManagement.Model;
using StockManagement.Repository;

namespace StockManagement.Services
{
    //public class LovelloService
    //{
    //    private readonly UnitOfWork _unitOfWork;

    //    public LovelloService(UnitOfWork unitOfWork)
    //    {
    //        _unitOfWork = unitOfWork;
    //    }
    //    public async Task<ActionResult<IEnumerable<DailyDataDTO>>> GetLovelloDataPerDay(DateTime StartDate, DateTime EndDate)
    //    {
    //        var query = await _unitOfWork.LovelloIceCreamMaster_tbl.Queryable.Where(x => x.CreatedDate.Date >= StartDate.Date && x.CreatedDate.Date <= EndDate.Date)
    //                                                         .Select(query => new DailyDataDTO
    //                                                         {
    //                                                             CreatedDate = query.CreatedDate,
    //                                                             TotalSalesQuantity = query.TotalSalesQuantity ?? 0,
    //                                                             TotalAmount = query.GrandTotalAmount ?? 0
    //                                                         }).ToListAsync();
    //        return query;
    //    }


    //    public async Task<ActionResult<int>> InsertLovelloData(List<LovelloIceCreamDTO> lovelloIceCreamVM)
    //    {
    //        int result = 0;
    //        LovelloIceCreamMaster_tbl master = new LovelloIceCreamMaster_tbl
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
    //        await _unitOfWork.LovelloIceCreamMaster_tbl.AddAsync(master);
    //        await _unitOfWork.SaveChangesAsync();

    //        foreach (var item in lovelloIceCreamVM)
    //        {
    //            var lovelloIceCream = new LovelloIceCream
    //            {
    //                LovelloIceCreamMasterId=master.LovelloIceCreamMasterId,
    //                CompanyId = item.CompanyId,
    //                ProductId = item.ProductId,
    //                Eja = (item.Total ?? 0) - (item.SalesQuantity ?? 0),
    //                Price = item.Price,
    //                NewProduct = item.NewProduct,
    //                Total = item.Total,
    //                SalesQuantity = item.SalesQuantity,
    //                TotalAmount = item.TotalAmount,
    //                Dumping = item.Dumping,
    //                Receive = item.Receive,
    //                Remaining = item.Remaining,
    //                CreatedDate = DateTime.Now
    //            };
    //            await _unitOfWork.LovelloIceCream.AddAsync(lovelloIceCream);
    //        }

    //        master.TotalEja = await _unitOfWork.LovelloIceCream.Queryable.Where(a => a.LovelloIceCreamMasterId == master.LovelloIceCreamMasterId).SumAsync(a => a.Eja);
    //        master.TotalPrice = await _unitOfWork.LovelloIceCream.Queryable.Where(a => a.LovelloIceCreamMasterId == master.LovelloIceCreamMasterId).SumAsync(a => a.Price);
    //        master.TotalNewProduct = await _unitOfWork.LovelloIceCream.Queryable.Where(a => a.LovelloIceCreamMasterId == master.LovelloIceCreamMasterId).SumAsync(a => a.NewProduct);
    //        master.GrandTotal = await _unitOfWork.LovelloIceCream.Queryable.Where(a => a.LovelloIceCreamMasterId == master.LovelloIceCreamMasterId).SumAsync(a => a.Total);
    //        master.TotalSalesQuantity = await _unitOfWork.LovelloIceCream.Queryable.Where(a => a.LovelloIceCreamMasterId == master.LovelloIceCreamMasterId).SumAsync(a => a.SalesQuantity);
    //        master.GrandTotalAmount = await _unitOfWork.LovelloIceCream.Queryable.Where(a => a.LovelloIceCreamMasterId == master.LovelloIceCreamMasterId).SumAsync(a => a.TotalAmount);
    //        master.TotalDumping = await _unitOfWork.LovelloIceCream.Queryable.Where(a => a.LovelloIceCreamMasterId == master.LovelloIceCreamMasterId).SumAsync(a => a.Dumping);
    //        master.TotalReceive = await _unitOfWork.LovelloIceCream.Queryable.Where(a => a.LovelloIceCreamMasterId == master.LovelloIceCreamMasterId).SumAsync(a => a.Receive);
    //        master.TotalRemaining = await _unitOfWork.LovelloIceCream.Queryable.Where(a => a.LovelloIceCreamMasterId == master.LovelloIceCreamMasterId).SumAsync(a => a.Remaining);

    //        _unitOfWork.LovelloIceCreamMaster_tbl.Update(master);

    //        result = await _unitOfWork.SaveChangesAsync();
    //        return result;
    //    }

    //}
}
