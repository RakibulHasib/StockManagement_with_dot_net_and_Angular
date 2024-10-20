using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagement.DTO;
using StockManagement.Entities;
using StockManagement.Repository;
using static StockManagement.Controllers.ProductsController;
using System.ComponentModel.Design;
using static StockManagement.Services.SalesDistributeService;

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

    public async Task<ActionResult<int>> InsertStockData(int companyId, DateTime createdDate, List<StockDTO> savoyIceCreamVM)
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
            IsDeleted = 0,
            CreationTime = createdDate
        };
        await _unitOfWork.Stock.AddRawAsync(master);
        await _unitOfWork.SaveChangesAsync();

        foreach (var item in savoyIceCreamVM)
        {
            var stockDetails = new StockDetail
            {
                StockDetailsId = Guid.NewGuid(),
                StockId = master.StockId,
                CompanyId = companyId,
                ProductId = item.ProductId,
                Price = item.Price,
                RestockQuantity = item.NewProduct,
                TotalQuantity = item.Total,
                Eja = item.Eja,
                SalesQuantity = item.SalesQuantity,
                TotalAmount = item.TotalAmount,
                DamageQuantity = item.DamageQuantity ?? 0,
                IsDeleted = 0,
                CreationTime = createdDate
            };
            await _unitOfWork.StockDetail.AddRawAsync(stockDetails);
        }
        await _unitOfWork.SaveChangesAsync();

        master.TotalEja = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.Eja ?? 0);
        master.TotalPrice = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.Price);
        master.TotalNewProduct = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.RestockQuantity ?? 0);
        master.GrandTotal = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.TotalQuantity ?? 0);
        master.TotalSalesQuantity = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.SalesQuantity ?? 0);
        master.GrandTotalAmount = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.TotalAmount ?? 0);

        _unitOfWork.Stock.Update(master);

        var distributeData = await _unitOfWork.SalesDistribute.Queryable
            .Where(a => a.CompanyId == companyId && a.IsDeleted == 0 && a.Status == 1)
            .ToListAsync();

        foreach (var item in distributeData)
        {
            item.Status = (int)DailyDistributeStatus.StockComplete;
            _unitOfWork.SalesDistribute.Update(item);
        }

        var products = await _unitOfWork.Product.Queryable
            .Where(a => a.CompanyId == companyId && a.IsDeleted == 0)
            .ToListAsync();

        foreach (var item in products)
        {
            item.Eja = item.StockQuantity;
            item.NewQuantity = 0;
            _unitOfWork.Product.Update(item);
        }
        await _unitOfWork.SaveChangesAsync();
        return result;
    }

    public async Task<ActionResult<ReportDTO>> GetReport(int StockId)
    {
        ReportDTO? reportDTO = new ReportDTO();
        var savoyIceCreamData = await _unitOfWork.Stock.Queryable
                                .Where(a => a.StockId == StockId && a.IsDeleted == 0)
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

        savoyIceCreamData.reportDetails = (from si in _unitOfWork.StockDetail.Queryable.Where(a => a.IsDeleted == 0)
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
                                               TotalQuantity = si.TotalQuantity,
                                               TotalPrice = si.TotalQuantity * si.Price,
                                               SalesQuantity = si.SalesQuantity,
                                               ReturnQuantity = si.TotalQuantity - si.SalesQuantity,
                                               ReturnPrice = (si.TotalQuantity - si.SalesQuantity) * si.Price,
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

    public async Task<int> CheckCreatableStock(int CompanyID)
    {
        int result = 0;
        var isdistributeDataExist = await _unitOfWork.SalesDistribute.Queryable
            .Where(a => a.CompanyId == CompanyID && a.IsDeleted == 0 && a.Status == 1)
            .ToListAsync();

        if(isdistributeDataExist.Count > 0)
        {
            var lastStockData = await _unitOfWork.Stock.Queryable
                .Where(a => a.CompanyId == CompanyID && a.IsDeleted == 0)
                .OrderByDescending(a => a.CreationTime)
                .FirstOrDefaultAsync();

            if (lastStockData != null)
            {
                result = (DateTime.Now.Date - lastStockData.CreationTime.Date).Days;
                if (result == 0)
                {
                    result = 1;
                }
            } else
            {
                result = 1;
            }
        }
        return result;
    }
}
