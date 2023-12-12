using Microsoft.AspNetCore.Mvc;
using StockManagement.DTO;
using StockManagement.Features.Company;
using StockManagement.Helpers;
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
    public async Task<ActionResult<IEnumerable<CompaniesDTO>>> CompanyDashboard(GetCompanyListQuery query)
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
    public async Task<ActionResult<int>> InsertNewCompany(CompaniesDTO companies)
    {
        return Ok(await _companyService.InsertCompany(companies));
    }


    [Transaction]
    [HttpPut("UpdateCompany")]
    public async Task<ActionResult<int>> UpdateCompany(CompaniesDTO companies)
    {
        return Ok(await _companyService.UpdateCompany(companies));
    }


    [Transaction]
    [HttpPut("DeleteCompany/{companyId}")]
    public async Task<ActionResult<int>> DeleteCompany(int companyId)
    {
        return Ok(await _companyService.DeleteCompany(companyId));
    }

}
