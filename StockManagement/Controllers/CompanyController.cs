using Microsoft.AspNetCore.Mvc;
using StockManagement.DTO;
using StockManagement.Entities;
using StockManagement.Features.CompanyFeatures;
using StockManagement.Helpers;
using StockManagement.Model;
using StockManagement.Services;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace StockManagement.Controllers;

public class CompanyController : BaseController<CompanyController>
{
    private readonly CompanyService _companyService;

    public CompanyController(CompanyService companyService)
    {
        _companyService = companyService;
    }


    [HttpGet("CompanyDashboard")]
    public async Task<ActionResult<IEnumerable<CompaniesDTO>>> CompanyDashboard()
    {
        return await _mediator.Send(new GetCompanyListQuery());
    }

    [HttpGet("GetCompanyByID/{companyId}")]
    public async Task<ActionResult<CompaniesDTO?>> GetCompanyByID(int companyId)
    {
        return await _mediator.Send(new GetCompanyByCompanyIdQuery { CompanyId = companyId });
    }

    [Transaction]
    [HttpPost("InsertNewCompany")]
    public async Task<ActionResult<ApiResponse>> InsertNewCompany(InsertNewCompanyCommand command)
    {
        return  await _mediator.Send(command);
    }


    [Transaction]
    [HttpPut("UpdateCompany")]
    public async Task<ActionResult<ApiResponse>> UpdateCompany(UpdateCompanyCommand command)
    {
        return await _mediator.Send(command);
    }


    [Transaction]
    [HttpPut("DeleteCompany/{companyId}")]
    public async Task<ActionResult<ApiResponse>> DeleteCompany([FromRoute] int companyId)
    {
      return  await _mediator.Send(new DeleteCompanyCommand() { CompanyId = companyId });
    }

}
