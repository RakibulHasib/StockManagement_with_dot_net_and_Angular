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
        public async Task<ActionResult<IEnumerable<DailyDistributeDataDTO>>> GetSalesDistributeDataPerDay(DateTime StartDate, DateTime EndDate)
        {
            return await _salesDistributeService.GetSalesDistributeDataPerDay(StartDate, EndDate);
        }

        [Transaction]
        [HttpPost("InsertSalesDistributeData")]
        public async Task<ActionResult<int>> InsertSalesDistributeData(List<SalesDistributeDTO> salesDistributeVM)
        {
            return Ok(await _salesDistributeService.InsertSalesDistributeData(salesDistributeVM));
        }

        [HttpGet("GetProduct")]
        public async Task<ActionResult<List<ProductDTO>>> GetProduct()
        {
            return Ok(await _salesDistributeService.GetProduct());
        }
    }
}
