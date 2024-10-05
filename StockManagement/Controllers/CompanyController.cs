using StockManagement.Attributes;
using StockManagement.Features.CompanyFeatures;
using StockManagement.Helpers;

namespace StockManagement.Controllers;
[Route("api/[controller]")]
public class CompanyController : BaseController<CompanyController>
{
    private readonly CompanyService _companyService;

    public CompanyController(CompanyService companyService)
    {
        _companyService = companyService;
    }

    [JwtAuthorize]
    [HttpGet("CompanyDashboard")]
    public async Task<ActionResult<IEnumerable<CompaniesDTO>>> CompanyDashboard()
    {
        return await _mediator.Send(new GetCompanyListQuery());
    }

    [JwtAuthorize]
    [HttpGet("GetCompanyByID/{companyId}")]
    public async Task<ActionResult<CompaniesDTO?>> GetCompanyByID(int companyId)
    {
        return await _mediator.Send(new GetCompanyByCompanyIdQuery { CompanyId = companyId });
    }

    [JwtAuthorize]
    [Transaction]
    [HttpPost("InsertNewCompany")]
    public async Task<ActionResult<ApiResponse>> InsertNewCompany(InsertNewCompanyCommand command)
    {
        return await _mediator.Send(command);
    }

    [JwtAuthorize]
    [Transaction]
    [HttpPut("UpdateCompany")]
    public async Task<ActionResult<ApiResponse>> UpdateCompany(UpdateCompanyCommand command)
    {
        return await _mediator.Send(command);
    }

    [JwtAuthorize]
    [Transaction]
    [HttpPut("DeleteCompany/{companyId}")]
    public async Task<ActionResult<ApiResponse>> DeleteCompany([FromRoute] int companyId)
    {
        return await _mediator.Send(new DeleteCompanyCommand() { CompanyId = companyId });
    }

}
