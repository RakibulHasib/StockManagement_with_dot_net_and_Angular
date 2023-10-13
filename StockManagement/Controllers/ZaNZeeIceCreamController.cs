using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockManagement.DTO;
using StockManagement.Helpers;
using StockManagement.Services;

//namespace StockManagement.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    //public class ZaNZeeIceCreamController : ControllerBase
//    //{
//    //    private readonly ZaNZeeService _zaNZeeService;

//    //    public ZaNZeeIceCreamController(ZaNZeeService zaNZeeService)
//    //    {
//    //        _zaNZeeService = zaNZeeService;
//    //    }

//    //    [Transaction]
//    //    [HttpPost("InsertZaNZeeData")]
//    //    public async Task<ActionResult<int>> InsertZaNZeeData(List<ZaNZeeIceCreamDTO> zanzeeIceCreamVM)
//    //    {
//    //        return Ok(await _zaNZeeService.InsertZaNZeeData(zanzeeIceCreamVM));
//    //    }

//    //    [HttpGet("GetZaNZeeDataPerDay")]
//    //    public async Task<ActionResult<IEnumerable<DailyDataDTO>>> GetZaNZeeDataPerDay(DateTime StartDate, DateTime EndDate)
//    //    {
//    //        return await _zaNZeeService.GetZaNZeeDataPerDay(StartDate, EndDate);
//    //    }
//    //}
//}
