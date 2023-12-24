﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockManagement.DTO;
using StockManagement.Helpers;
using StockManagement.Services;

namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesDistributeController : ControllerBase
    {
        private readonly SalesDistributeService _salesDistributeService;

        public SalesDistributeController(SalesDistributeService salesDistributeService)
        {
            _salesDistributeService = salesDistributeService;
        }

        [HttpGet("GetSalesDistributeDataPerDay")]
        public async Task<ActionResult<IEnumerable<DailyDistributeDataDTO>>> GetSalesDistributeDataPerDay(int ConcernPersonID,DateTime StartDate, DateTime EndDate)
        {
            return await _salesDistributeService.GetSalesDistributeDataPerDay(ConcernPersonID, StartDate, EndDate);
        }

        [HttpGet("GetDistributeDataByID")]
        public async Task<ActionResult<SalesDistributeDataDto>> GetDistributeDataByID(int SalesDistributeId)
        {
            return await _salesDistributeService.GetDistributeDataByID(SalesDistributeId);
        }

        [Transaction]
        [HttpPost("InsertSalesDistributeData")]
        public async Task<ActionResult<int>> InsertSalesDistributeData(SalesDistributeDataDto data)
        {
            return Ok(await _salesDistributeService.InsertSalesDistributeData(data.ConcernPersonID, data.salesDistribute));
        }

        [HttpGet("GetProduct")]
        public async Task<ActionResult<List<ProductDTO>>> GetProduct()
        {
            return Ok(await _salesDistributeService.GetProduct());
        }

        [HttpGet("GetProductWisePrice")]
        public async Task<ActionResult<ProductPriceDTO>> GetProductWisePrice(int ProductID)
        {
            return Ok(await _salesDistributeService.GetProductWisePrice(ProductID));
        }

        [HttpGet("GetProductWiseRemaining")]
        public async Task<ActionResult<int>> GetProductWiseRemaining(int ProductID, int ConcernPersonID)
        {
            return Ok(await _salesDistributeService.GetProductWiseRemaining(ProductID, ConcernPersonID));
        }

        [HttpGet("GetSalesDistributeReport")]
        public async Task<ActionResult<SalesDistributeReportDTO>> GetSalesDistributeReport(int SalesDistributeId)
        {
            return await _salesDistributeService.GetSalesDistributeReport(SalesDistributeId);
        }

        [HttpGet("CheckTodayConcernPersonDistribution")]
        public async Task<ActionResult<bool>> CheckTodayConcernPersonDistribution(int ConcernPersonId)
        {
            return await _salesDistributeService.CheckTodayConcernPersonDistribution(ConcernPersonId);
        }

        [Transaction]
        [HttpPut("DeleteDistribution")]
        public async Task<ActionResult<int>> DeleteDistribution(int SalesDistributeId)
        {
            return Ok(await _salesDistributeService.DeleteDistribution(SalesDistributeId));
        }
    }
}
