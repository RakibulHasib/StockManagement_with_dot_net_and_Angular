using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagement.DTO;
using StockManagement.Entities;
using StockManagement.Repository;
using static StockManagement.Controllers.ProductsController;
using System.ComponentModel.Design;

namespace StockManagement.Services;

public class StockService
{
    private readonly UnitOfWork _unitOfWork;

    public StockService(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    public async Task<ActionResult<IEnumerable<DailyDataDTO>>> GetStockDataPerDay(int companyId, DateTime StartDate, DateTime EndDate)
    {
        var query = await _unitOfWork.Stock.Queryable
                    .Where(x => x.CreationTime.Date >= StartDate.Date && x.CreationTime.Date <= EndDate.Date
                            && x.CompanyId == companyId && x.IsDeleted == 0)
                    .Select(query => new DailyDataDTO
                    {
                        StockId = query.StockId,
                        CreationTime = query.CreationTime,
                        TotalSalesQuantity = query.TotalSalesQuantity,
                        TotalAmount = query.GrandTotalAmount
                    }).OrderByDescending(a => a.StockId).ToListAsync();
        return query;
    }

    public async Task<List<StockDTO>> GetStockByID(int StockID)
    {
        var data = await (from sd in _unitOfWork.StockDetail.Queryable
                          join sm in _unitOfWork.Stock.Queryable on sd.StockId equals sm.StockId
                          join p in _unitOfWork.Product.Queryable on sd.ProductId equals p.ProductId
                          let salesQ = _unitOfWork.SalesDistributeDetail.Queryable.Where(a => a.CreationTime.Date == DateTime.Now.Date && a.ProductId == p.ProductId && a.IsDeleted == 0).Sum(a => a.SalesQuantity)
                          where sd.StockId == StockID
                          select new StockDTO
                          {
                              StockId = sm.StockId,
                              StockDetailsId = sd.StockDetailsId,
                              CompanyId = sm.CompanyId,
                              ProductId = sd.ProductId,
                              ProductName = p.ProductName,
                              Eja = p.StockDetails.Where(a => a.IsDeleted == 0).OrderByDescending(x => x.CreationTime)
                                                                              .Select(x => x.Eja ?? 0)
                                                                              .Skip(1)
                                                                              .FirstOrDefault(),
                              Price = sd.Price,
                              NewProduct = sd.RestockQuantity ?? 0,
                              Total = sd.TotalQuantity,
                              SalesQuantity = salesQ,
                              TotalAmount = sd.TotalAmount,
                              DamageQuantity = sd.DamageQuantity ?? 0,
                              CreatedDate = sd.CreationTime
                          }).ToListAsync();

        return data;
    }

    public async Task<ActionResult<int>> InsertStockData(int companyId, List<StockDTO> savoyIceCreamVM)
    {
        int result = 0;
        Stock master = new Stock
        {
            CompanyId = companyId,
            TotalEja = 0,
            TotalPrice = 0,
            TotalNewProduct = 0,
            GrandTotal = 0,
            TotalSalesQuantity = 0,
            GrandTotalAmount = 0,
            IsDeleted = 0
        };
        await _unitOfWork.Stock.AddAsync(master);
        await _unitOfWork.SaveChangesAsync();

        foreach (var item in savoyIceCreamVM)
        {
            var total = (item.Eja ?? 0) + (item.NewProduct);
            var stockDetails = new StockDetail
            {
                StockDetailsId = Guid.NewGuid(),
                StockId = master.StockId,
                CompanyId = companyId,
                ProductId = item.ProductId,
                Price = item.Price,
                RestockQuantity = item.NewProduct,
                TotalQuantity = total,
                Eja = total - (item.SalesQuantity ?? 0),
                SalesQuantity = item.SalesQuantity,
                TotalAmount = (item.SalesQuantity) * (item.Price),
                DamageQuantity = item.DamageQuantity ?? 0,
                IsDeleted = 0
            };
            await _unitOfWork.StockDetail.AddAsync(stockDetails);
        }
        await _unitOfWork.SaveChangesAsync();

        master.TotalEja = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.Eja ?? 0);
        master.TotalPrice = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.Price);
        master.TotalNewProduct = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.RestockQuantity ?? 0);
        master.GrandTotal = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.TotalQuantity ?? 0);
        master.TotalSalesQuantity = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.SalesQuantity ?? 0);
        master.GrandTotalAmount = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.TotalAmount ?? 0);

        _unitOfWork.Stock.Update(master);
        result = await _unitOfWork.SaveChangesAsync();
        return result;
    }

    public async Task<int> UpdateStockData(int companyId, List<StockDTO> savoyIceCreamVM)
    {
        int result = 0;
        foreach (var item in savoyIceCreamVM)
        {
            var total = (item.Eja ?? 0) + (item.NewProduct);
            var stockDetails = new StockDetail
            {
                StockDetailsId = item.StockDetailsId ?? Guid.NewGuid(),
                StockId = item.StockId ?? 0,
                CompanyId = companyId,
                ProductId = item.ProductId,
                Price = item.Price,
                RestockQuantity = item.NewProduct,
                TotalQuantity = total,
                Eja = total - (item.SalesQuantity ?? 0),
                SalesQuantity = item.SalesQuantity,
                TotalAmount = (item.SalesQuantity) * (item.Price),
                CreationTime = item.CreatedDate ?? DateTime.Now,
                DamageQuantity = item.DamageQuantity ?? 0
            };
            _unitOfWork.StockDetail.Update(stockDetails);
        }

        await _unitOfWork.SaveChangesAsync();

        var master = await _unitOfWork.Stock.Queryable.Where(a => a.StockId == savoyIceCreamVM[0].StockId).FirstOrDefaultAsync();
        if (master != null)
        {
            master.TotalEja = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.Eja ?? 0);
            master.TotalPrice = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.Price);
            master.TotalNewProduct = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.RestockQuantity ?? 0);
            master.GrandTotal = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.TotalQuantity ?? 0);
            master.TotalSalesQuantity = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.SalesQuantity ?? 0);
            master.GrandTotalAmount = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.TotalAmount ?? 0);
            _unitOfWork.Stock.Update(master);
            result = await _unitOfWork.SaveChangesAsync();
        }
        return result;
    }

    public async Task<int> DeleteStock(int StockId)
    {
        int result = 0;
        var master = await _unitOfWork.Stock.Queryable.Where(a => a.StockId == StockId).FirstOrDefaultAsync();
        if (master != null)
        {
            master.IsDeleted = 1;
            _unitOfWork.Stock.Update(master);
            await _unitOfWork.SaveChangesAsync();

            var detail = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == StockId).ToListAsync();
            foreach (var item in detail)
            {
                item.IsDeleted = 1;
                _unitOfWork.StockDetail.Update(item);
            }
            result = await _unitOfWork.SaveChangesAsync();
        }
        return result;
    }

    public async Task<ActionResult<ReportDTO>> GetReport(int StockId)
    {
        ReportDTO? reportDTO = new ReportDTO();
        var savoyIceCreamData = await _unitOfWork.Stock.Queryable
                                .Where(a => a.StockId == StockId)
                                .Select(query => new ReportDTO
                                {
                                    StockId = query.StockId,
                                    CreationTime = query.CreationTime,
                                    CompanyID = query.CompanyId,
                                    CompanyName = query.Company.CompanyName,
                                    TotalPrice = query.GrandTotalAmount,
                                    DamageAmount = query.DamageAmount,
                                    AfterDamagePrice = query.GrandTotalAmount - (query.DamageAmount == null ? 0 : query.DamageAmount),
                                    Srcommission = query.Srcommission,
                                    AfterSrCommission = (query.GrandTotalAmount - (query.DamageAmount == null ? 0 : query.DamageAmount)) - (query.Srcommission == null ? 0 : query.Srcommission)
                                }).FirstOrDefaultAsync();

        reportDTO = savoyIceCreamData;

        savoyIceCreamData.reportDetails = (from si in _unitOfWork.StockDetail.Queryable
                                           join p in _unitOfWork.Product.Queryable on si.ProductId equals p.ProductId
                                           where si.StockId == StockId
                                           select new ReportDetail
                                           {
                                               StockId = si.StockId,
                                               StockDetailsId = si.StockDetailsId,
                                               CompanyId = si.CompanyId,
                                               ProductId = si.ProductId,
                                               ProductName = p.ProductName,
                                               Eja = si.Eja,
                                               Price = si.Price,
                                               RestockQuantity = si.RestockQuantity,
                                               SalesQuantity = si.SalesQuantity,
                                               TotalQuantity = si.TotalQuantity,
                                               TotalAmount = si.TotalAmount,
                                               DamageQuantity = si.DamageQuantity,
                                               CreationTime = si.CreationTime
                                           }).ToList();

        return reportDTO;
    }

    public async Task<int> UpdateDamageAmount(int StockId, decimal DamageAmount)
    {
        int result = 0;
        var stock = await _unitOfWork.Stock.Queryable.Where(a => a.StockId == StockId).FirstOrDefaultAsync();
        if (stock != null)
        {
            stock.DamageAmount = DamageAmount;
            _unitOfWork.Stock.Update(stock);
            result = await _unitOfWork.SaveChangesAsync();
        }
        return result;
    }

    public async Task<decimal> GetDamageAmountByID(int StockId)
    {
        var stock = await _unitOfWork.Stock.Queryable
                        .Where(a => a.StockId == StockId)
                        .Select(a => a.DamageAmount)
                        .FirstOrDefaultAsync();

        return stock;
    }

    public async Task<int> UpdateSRCommission([FromQuery] int StockId, [FromQuery] decimal Commission)
    {
        int result = 0;
        var stock = await _unitOfWork.Stock.Queryable.Where(a => a.StockId == StockId).FirstOrDefaultAsync();
        if (stock != null)
        {
            stock.Srcommission = Commission;
            _unitOfWork.Stock.Update(stock);
            result = await _unitOfWork.SaveChangesAsync();
        }
        return result;
    }

    public async Task<decimal> GetCommissionByID(int StockId)
    {
        var stock = await _unitOfWork.Stock.Queryable
                        .Where(a => a.StockId == StockId)
                        .Select(a => a.Srcommission)
                        .FirstOrDefaultAsync();

        return stock;
    }

    public async Task<bool> CheckTodayStock(int CompanyID)
    {
        var data = await _unitOfWork.Stock.Queryable
            .Where(a => a.CreationTime.Date == DateTime.Now.Date && a.CompanyId == CompanyID)
            .Select(a => a.StockId)
            .FirstOrDefaultAsync();

        return data != 0;
    }

    public async Task<bool> CheckTodayStockforUpdate(int StockID)
    {
        var data = await _unitOfWork.Stock.Queryable
            .Where(a => a.CreationTime.Date == DateTime.Now.Date && a.StockId == StockID)
            .Select(a => a.StockId)
            .FirstOrDefaultAsync();

        return data != 0;
    }
}
