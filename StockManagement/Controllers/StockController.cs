﻿using Microsoft.AspNetCore.Mvc;
using StockManagement.DTO;
using StockManagement.Helpers;
using StockManagement.Services;

namespace StockManagement.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StockController : ControllerBase
{
    private readonly StockService _stockService;

    public StockController(StockService stockService)
    {
        _stockService = stockService;
    }

    [Transaction]
    [HttpPost("InsertStockData/{companyId}")]
    public async Task<ActionResult<int>> InsertStockData([FromRoute] int companyId, List<StockDTO> savoyIceCreamVM)
    {
        return Ok(await _stockService.InsertStockData(companyId, savoyIceCreamVM));
    }

    [HttpGet("GetStockDataPerDay")]
    public async Task<ActionResult<IEnumerable<DailyDataDTO>>> GetStockDataPerDay(int companyId, DateTime StartDate, DateTime EndDate)
    {
        return await _stockService.GetStockDataPerDay(companyId, StartDate, EndDate);
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

}