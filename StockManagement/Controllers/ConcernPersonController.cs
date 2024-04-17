using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockManagement.DTO;
using StockManagement.Features.CompanyFeatures;
using StockManagement.Features.ConcernPersonFeatures;
using StockManagement.Helpers;
using StockManagement.Services;

namespace StockManagement.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ConcernPersonController : BaseController<ConcernPersonController>
{
    private readonly ConcernPersonService _concernPersonService;
    public ConcernPersonController(ConcernPersonService concernPersonService)
    {
        _concernPersonService = concernPersonService; 
    }

    [HttpGet("concernPersonDashboard")]
    public async Task<ActionResult<IEnumerable<ConcernPersonDTO>>> concernPersonDashboard()
    {
        return Ok(await _concernPersonService.GetConcernPersonList());
    }

    [HttpGet("GetConcernPersonByID/{ConcernPersonId}")]
    public async Task<ActionResult<ConcernPerson>> GetConcernPersonByID(int ConcernPersonId)
    {
        return await _concernPersonService.GetConcernPersonByID(ConcernPersonId);
    }

    [Transaction]
    [HttpPost("InsertConcernPerson")]
    public async Task<ActionResult<int>> InsertConcernPersonList(ConcernPersonDTO concernPerson)
    {
        return Ok(await _concernPersonService.InsertConcernPersonList(concernPerson));
    }


    [Transaction]
    [HttpPut("UpdateConcernPerson")]
    public async Task<ActionResult<int>> UpdateConcernPersonList(ConcernPersonDTO concernPerson)
    {
        return Ok(await _concernPersonService.UpdateConcernPersonList(concernPerson));
    }


    //[Transaction]
    //[HttpPut("DeleteConcernPerson")]
    //public async Task<ActionResult<int>> DeleteConcernPerson(int ConcernPersonId)
    //{
    //    return Ok(await _concernPersonService.DeleteConcernPerson(ConcernPersonId));
    //}

    [Transaction]
    [HttpPut("DeleteConcernPerson/{concernPersonId}")]
    public async Task<ActionResult<ApiResponse>> DeleteConcernPerson([FromRoute] int concernPersonId)
    {
        return await _mediator.Send(new DeleteConcernPersonCommand() { ConcernPersonId = concernPersonId });
    }
}
