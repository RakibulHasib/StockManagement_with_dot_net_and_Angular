namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MiscController : ControllerBase
    {
        [HttpGet("server-time")]
        public ActionResult<DateTime> GetServerTime()
        {
            return DateTime.Now;
        }

    }
}
