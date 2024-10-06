using StockManagement.Attributes;
using StockManagement.Helpers;

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

        [JwtAuthorize]
        [HttpGet("GetSalesDistributeDataPerDay")]
        public async Task<ActionResult<IEnumerable<DailyDistributeDataDTO>>> GetSalesDistributeDataPerDay(int ConcernPersonID, DateTime StartDate, DateTime EndDate)
        {
            return await _salesDistributeService.GetSalesDistributeDataPerDay(ConcernPersonID, StartDate, EndDate);
        }

        [JwtAuthorize]
        [HttpPost("InsertSalesDistributeData")]
        public async Task<ActionResult<int>> InsertSalesDistributeData(SalesDistributeDataDto data)
        {
            return Ok(await _salesDistributeService.InsertSalesDistributeData(data.ConcernPersonID, data.CompanyId, data.DistributionTime, data.salesDistribute));
        }

        [JwtAuthorize]
        [HttpGet("GetDistributorStatus")]
        public async Task<ActionResult<List<DailyDistributorStatusDTO>>> GetDistributorStatus(DateTime date)
        {
            return Ok(await _salesDistributeService.GetDistributorStatus(date));
        }

        [HttpGet("GetSalesDistributeReport")]
        public async Task<ActionResult<SalesDistributeReportDTO>> GetSalesDistributeReport(int SalesDistributeId)
        {
            return await _salesDistributeService.GetSalesDistributeReport(SalesDistributeId);
        }

        [JwtAuthorize]
        [Transaction]
        [HttpPut("DeleteDistribution")]
        public async Task<ActionResult<int>> DeleteDistribution(int SalesDistributeId)
        {
            return Ok(await _salesDistributeService.DeleteDistribution(SalesDistributeId));
        }

        [JwtAuthorize]
        [HttpGet("GetAvailableDistribute/{concernPersonId}/{companyId}")]
        public async Task<ActionResult<SalesDistributeAvailabityDto>> GetAvailableDistributeForConcernPerson(int concernPersonId, int companyId)
        {
            return Ok(await _salesDistributeService.GetAvailableDistributeForConcernPerson(concernPersonId, companyId));
        }

        [HttpGet("GetProductInfoByCompany/{companyId}")]
        public async Task<ActionResult<List<ProductInfoByConcernPersonDTO>>> GetProductInfoByCompany(int companyId)
        {
            return Ok(await _salesDistributeService.GetProductInfoByCompany(companyId));
        }
    }
}
