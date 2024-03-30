using Microsoft.AspNetCore.Mvc;
using StockManagement.DTO;
using StockManagement.Entities;
using StockManagement.Features.StockFeatures;
using StockManagement.Helpers;
using StockManagement.Services;

namespace StockManagement.Controllers;

public class StockController : BaseController<StockController>
{
    private readonly StockService _stockService;

    public StockController(StockService stockService)
    {
        _stockService = stockService;
    }

    [HttpGet("GetStockByID")]
    public async Task<ActionResult<IEnumerable<StockDTO>>> GetStockByID(int StockID)
    {
        return await _stockService.GetStockByID(StockID);
    }

    [Transaction]
    [HttpPost("InsertStockData/{companyId}")]
    public async Task<ActionResult<int>> InsertStockData([FromRoute] int companyId, List<StockDTO> savoyIceCreamVM)
    {
        return Ok(await _stockService.InsertStockData(companyId, savoyIceCreamVM));
    }

    [Transaction]
    [HttpPut("UpdateStockData/{companyId}")]
    public async Task<ActionResult<int>> UpdateStockData([FromRoute] int companyId, List<StockDTO> savoyIceCreamVM)
    {
        return Ok(await _stockService.UpdateStockData(companyId, savoyIceCreamVM));
    }
    [Transaction]
    [HttpPut("DeleteStock")]
    public async Task<ActionResult<int>> DeleteStock(int StockId)
    {
        return Ok(await _stockService.DeleteStock(StockId));
    }

    [HttpGet("GetStockDataPerDay")]
    public async Task<ActionResult<IEnumerable<DailyDataDTO>>> GetStockDataPerDay([FromQuery] GetStockDataPerDayQuery query)
    {
        return await _mediator.Send(query);
    }

    [HttpGet("GetReport")]
    public async Task<ActionResult<ReportDTO>> GetReport(int StockId)
    {
        return await _stockService.GetReport(StockId);
    }

    [HttpPut("UpdateDamage")]
    public async Task<ActionResult<int>> UpdateDamageAmount(int StockId, decimal DamageAmount)
    {
        return Ok(await _stockService.UpdateDamageAmount(StockId, DamageAmount));
    }

    [HttpPut("UpdateSRCommission")]
    public async Task<ActionResult<int>> UpdateSRCommission(int StockId, decimal Commission)
    {
        return Ok(await _stockService.UpdateSRCommission(StockId, Commission));
    }

    [HttpGet("GetDamageAmountByID")]
    public async Task<ActionResult<decimal>> GetDamageAmountByID(int StockId)
    {
        return await _stockService.GetDamageAmountByID(StockId);
    }

    [HttpGet("GetCommissionByID")]
    public async Task<ActionResult<decimal>> GetCommissionByID(int StockId)
    {
        return await _stockService.GetCommissionByID(StockId);
    }

    [HttpGet("CheckTodayStock")]
    public async Task<ActionResult<bool>> CheckTodayStock(int CompanyID)
    {
        return await _stockService.CheckTodayStock(CompanyID);
    }

    [HttpGet("CheckTodayStockforUpdate")]
    public async Task<ActionResult<bool>> CheckTodayStockforUpdate(int StockID)
    {
        return await _stockService.CheckTodayStockforUpdate(StockID);
    }

    [HttpGet("GetDistributorStockCreateStatus")]
    public async Task<ActionResult<bool>> GetDistributorStockCreateStatus()
    {
        return await _stockService.GetDistributorStockCreateStatus();
    }
}
