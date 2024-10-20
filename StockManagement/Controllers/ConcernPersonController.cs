using StockManagement.Features.ConcernPersonFeatures;
using StockManagement.Helpers;

namespace StockManagement.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ConcernPersonController : BaseController<ConcernPersonController>
{
    private readonly ConcernPersonService _concernPersonService;
    public ConcernPersonController(ConcernPersonService concernPersonService)
    {
        _concernPersonService = concernPersonService;
    }

    [JwtAuthorize]
    [HttpGet("concernPersonDashboard")]
    public async Task<ActionResult<IEnumerable<ConcernPersonDTO>>> concernPersonDashboard()
    {
        return Ok(await _concernPersonService.GetConcernPersonList());
    }

    [JwtAuthorize]
    [HttpGet("GetConcernPersonByID/{ConcernPersonId}")]
    public async Task<ActionResult<ConcernPerson>> GetConcernPersonByID(int ConcernPersonId)
    {
        return await _concernPersonService.GetConcernPersonByID(ConcernPersonId);
    }

    [JwtAuthorize]
    [Transaction]
    [HttpPost("InsertConcernPerson")]
    public async Task<ActionResult<int>> InsertConcernPersonList(ConcernPersonDTO concernPerson)
    {
        return Ok(await _concernPersonService.InsertConcernPersonList(concernPerson));
    }

    [JwtAuthorize]
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

    [JwtAuthorize]
    [Transaction]
    [HttpPut("DeleteConcernPerson/{concernPersonId}")]
    public async Task<ActionResult<ApiResponse>> DeleteConcernPerson([FromRoute] int concernPersonId)
    {
        return await _mediator.Send(new DeleteConcernPersonCommand() { ConcernPersonId = concernPersonId });
    }
}
