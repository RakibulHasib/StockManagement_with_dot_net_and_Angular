using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockManagement.DTO;
using StockManagement.Helpers;
using StockManagement.Services;

namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class lovelloIceCreamController : ControllerBase
    {
        private readonly LovelloService _lovelloService;

        public lovelloIceCreamController(LovelloService lovelloService)
        {
            _lovelloService = lovelloService;
        }

        [Transaction]
        [HttpPost("InsertLovelloData")]
        public async Task<ActionResult<int>> InsertLovelloData(List<LovelloIceCreamDTO> lovelloIceCreamVM)
        {
            return Ok(await _lovelloService.InsertLovelloData(lovelloIceCreamVM));
        }

        [HttpGet("GetLovelloDataPerDay")]
        public async Task<ActionResult<IEnumerable<DailyDataDTO>>> GetLovelloDataPerDay(DateTime StartDate, DateTime EndDate)
        {
            return await _lovelloService.GetLovelloDataPerDay(StartDate, EndDate);
        }
    }
}
