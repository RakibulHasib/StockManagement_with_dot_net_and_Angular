using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockManagement.DTO;
using StockManagement.Helpers;
using StockManagement.Services;

namespace StockManagement.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ConcernPersonController : ControllerBase
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
    public async Task<ActionResult<ConcernPersonDTO>> GetConcernPersonByID(int ConcernPersonId)
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


    [Transaction]
    [HttpPut("DeleteConcernPerson/{ConcernPersonId}")]
    public async Task<ActionResult<int>> DeleteConcernPerson(int ConcernPersonId)
    {
        return Ok(await _concernPersonService.DeleteConcernPerson(ConcernPersonId));
    }
}
