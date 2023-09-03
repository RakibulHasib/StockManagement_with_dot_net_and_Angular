using Microsoft.AspNetCore.Mvc;
using StockManagement.DTO;
using StockManagement.Helpers;
using StockManagement.Model;
using StockManagement.Repository;
using StockManagement.Services;

namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavoyIceCreamsController : ControllerBase
    {
        private readonly SavoyService _savoyService;

        public SavoyIceCreamsController(SavoyService savoyService)
        {
            _savoyService = savoyService;
        }

        [Transaction]
        [HttpPost("InsertSavoyData")]
        public async Task<ActionResult<int>> InsertSavoyData(List<SavoyIceCreamDTO> savoyIceCreamVM)
        {
            return Ok(await _savoyService.InsertSavoyData(savoyIceCreamVM));
        }

        [HttpGet("GetSavoyDataPerDay")]
        public async Task<ActionResult<IEnumerable<DailyDataDTO>>> GetSavoyDataPerDay(DateTime StartDate, DateTime EndDate)
        {
            return await _savoyService.GetSavoyDataPerDay(StartDate, EndDate);
        }

    }
}
