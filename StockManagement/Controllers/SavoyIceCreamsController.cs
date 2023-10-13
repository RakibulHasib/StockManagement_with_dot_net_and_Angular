using Microsoft.AspNetCore.Mvc;
using StockManagement.DTO;
using StockManagement.Helpers;
using StockManagement.Services;

namespace StockManagement.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SavoyIceCreamsController : ControllerBase
{
    private readonly StockService _stockService;

    public SavoyIceCreamsController(StockService stockService)
    {
        _stockService = stockService;
    }

    [Transaction]
    [HttpPost("InsertStockData/{companyId}")]
    public async Task<ActionResult<int>> InsertSavoyData([FromRoute] int companyId, List<StockDTO> savoyIceCreamVM)
    {
        return Ok(await _stockService.InsertStockData(companyId, savoyIceCreamVM));
    }

    //[HttpGet("GetSavoyDataPerDay")]
    //public async Task<ActionResult<IEnumerable<DailyDataDTO>>> GetSavoyDataPerDay(DateTime StartDate, DateTime EndDate)
    //{
    //    return await _savoyService.GetSavoyDataPerDay(StartDate, EndDate);
    //}

    //[HttpGet("GetSavoyReport")]
    //public async Task<ActionResult<IEnumerable<SavoyReportDTO>>> GetSavoyReport(int SavoyIceCreamMasterId)
    //{
    //    return await _savoyService.GetSavoyReport(SavoyIceCreamMasterId);
    //}

}
