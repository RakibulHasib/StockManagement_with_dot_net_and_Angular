using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockManagement.DTO;
using StockManagement.Helpers;
using StockManagement.Services;

namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        private readonly CommonService _commonService;
        public CommonController(CommonService commonService)
        {
            _commonService = commonService;  
        }
        [Transaction]
        [HttpPost("CompanyNewCompany")]
        public async Task<ActionResult<int>> CompanyNewCompany(CompanyDTO companyDTO )
        {
            return Ok(await _commonService.InsertCompany(companyDTO));
        }
    }
}
