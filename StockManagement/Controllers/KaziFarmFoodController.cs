using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockManagement.DTO;
using StockManagement.Helpers;
using StockManagement.Services;

namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KaziFarmFoodController : ControllerBase
    {
        private readonly KaziFarmFoodService _kaziFarmFoodService;

        public KaziFarmFoodController(KaziFarmFoodService kaziFarmFoodService)
        {
            _kaziFarmFoodService = kaziFarmFoodService;
        }

        [Transaction]
        [HttpPost("InserKaziFarmtData")]
        public async Task<ActionResult<int>> InserKaziFarmtData(List<KaziFarmFoodDTO> kazifarmIceCreamVM)
        {
            return Ok(await _kaziFarmFoodService.InserKaziFarmtData(kazifarmIceCreamVM));
        }

        [HttpGet("GetIglooDataPerDay")]
        public async Task<ActionResult<IEnumerable<DailyDataDTO>>> GetKaziFarmDataPerDay(DateTime StartDate, DateTime EndDate)
        {
            return await _kaziFarmFoodService.GetKaziFarmDataPerDay(StartDate, EndDate);
        }
    }
}
