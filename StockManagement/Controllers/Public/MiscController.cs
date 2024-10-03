namespace StockManagement.Controllers.Public
{
    [ApiController]
    public class MiscController : ControllerBase
    {
        [Route("~/ping")]
        [HttpGet, HttpPost, HttpHead, HttpOptions]
        public IActionResult Ping()
        {
            return Ok();
        }
    }
}