using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockManagement.DTO;
using StockManagement.Helpers;
using StockManagement.Services;

namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IglooIceCreamController : ControllerBase
    {
        private readonly IglooService _iglooService;

        public IglooIceCreamController(IglooService iglooService)
        {
            _iglooService = iglooService;
        }

        [Transaction]
        [HttpPost("InsertIglooData")]
        public async Task<ActionResult<int>> InsertIglooData(List<IglooIceCreamDTO> iglooIceCreamVM)
        {
            return Ok(await _iglooService.InsertIglooData(iglooIceCreamVM));
        }

        [HttpGet("GetIglooDataPerDay")]
        public async Task<ActionResult<IEnumerable<DailyDataDTO>>> GetIglooDataPerDay(DateTime StartDate, DateTime EndDate)
        {
            return await _iglooService.GetIglooDataPerDay(StartDate, EndDate);
        }
    }
}
