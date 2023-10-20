using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockManagement.DTO;
using StockManagement.Helpers;
using StockManagement.Services;

namespace StockManagement.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CompanyController : ControllerBase
{
    private readonly CompanyService _companyService;

    public CompanyController(CompanyService companyService)
    {
        _companyService = companyService;
    }


    [HttpGet("CompanyDashboard")]
    public async Task<ActionResult<IEnumerable<CompaniesDTO>>> CompanyDashboard()
    {
        return Ok(await _companyService.GetCompanyList());
    }

    [HttpGet("GetCompanyByID/{companyId}")]
    public async Task<ActionResult<CompaniesDTO>> GetCompanyByID(int companyId)
    {
        return await _companyService.GetCompanyByID(companyId);
    }

    [Transaction]
    [HttpPost("InsertNewCompany")]
    public async Task<ActionResult<int>> InsertNewCompany(CompaniesDTO companies)
    {
        return Ok(await _companyService.InsertCompany( companies));
    }


    [Transaction]
    [HttpPut("UpdateCompany")]
    public async Task<ActionResult<int>> UpdateCompany(CompaniesDTO companies)
    {
        return Ok(await _companyService.UpdateCompany(companies));
    }


    [Transaction]
    [HttpPut("DeleteCompany")]
    public async Task<ActionResult<int>> DeleteCompany(int companyId)
    {
        return Ok(await _companyService.DeleteCompany(companyId));
    }

}
