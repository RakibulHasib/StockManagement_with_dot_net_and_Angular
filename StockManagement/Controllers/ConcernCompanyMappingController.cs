using StockManagement.Attributes;
using StockManagement.Features.SalesDistributeFeatures;
using StockManagement.Helpers;

namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConcernCompanyMappingController : BaseController<CompanyController>
    {
        private readonly UnitOfWork _unitOfWork;

        public ConcernCompanyMappingController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [JwtAuthorize]
        [HttpGet("GetConcernPersonCompanyMapping")]
        public async Task<ActionResult<IEnumerable<ConcernCompanyMappingDTO>>> GetConcernPersonCompanyMapping()
        {
            return await _mediator.Send(new GetConcernCompanyMappingQuery());
        }

        [JwtAuthorize]
        [HttpGet("{ConcernPersonId}")]
        public async Task<ActionResult<IEnumerable<ConcernCompanyDTO>>> GetCompanyByConcernPerson(int ConcernPersonId)
        {
            var data = await _unitOfWork.ConcernUserCompanyMapping.Queryable
                .Where(a => a.ConcernPersonId == ConcernPersonId)
                .Select(query => new ConcernCompanyDTO
                {
                    Id = query.Id,
                    ConcernPersonId = query.ConcernPersonId,
                    CompanyId = query.CompanyId,
                    CompanyName = query.Company.CompanyName

                }).ToListAsync();
            return data;
        }

        [JwtAuthorize]
        [Transaction]
        [HttpPost("InsertConcernPersonCompanyList")]
        public async Task<ActionResult<int>> InsertConcernPersonCompanyList(ConcernCompanyDTO concernCompanyDTO)
        {
            var concernCompany = new ConcernUserCompanyMapping
            {
                ConcernPersonId = concernCompanyDTO.ConcernPersonId,
                CompanyId = concernCompanyDTO.CompanyId
            };
            await _unitOfWork.ConcernUserCompanyMapping.AddAsync(concernCompany);
            return Ok(await _unitOfWork.SaveChangesAsync());
        }

        [JwtAuthorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var data = await _unitOfWork.ConcernUserCompanyMapping.Queryable
                .Where(a => a.Id == id).FirstOrDefaultAsync();
            _unitOfWork.ConcernUserCompanyMapping.Delete(data);

            return Ok(await _unitOfWork.SaveChangesAsync());
        }


        public sealed class ConcernCompanyDTO
        {
            public int? Id { get; set; }
            public int ConcernPersonId { get; set; }
            public int CompanyId { get; set; }
            public string? CompanyName { get; set; }
        }
    }
}
