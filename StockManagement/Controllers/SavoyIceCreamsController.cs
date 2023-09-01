using Microsoft.AspNetCore.Mvc;
using StockManagement.DTO;
using StockManagement.Model;
using StockManagement.Repository;
using StockManagement.Services;

namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavoyIceCreamsController : ControllerBase
    {
        private readonly SavoyService _savoyService;

        public SavoyIceCreamsController(SavoyService savoyService)
        {
            _savoyService = savoyService;
        }



        //// GET: api/SavoyIceCreams
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<SavoyIceCream>>> GetsavoyIceCreams()
        //{
        //    return await _unitOfWork.SavoyIceCream.GetAsync(x => x.CompanyId != 0);
        //}

        //// GET: api/SavoyIceCreams/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<SavoyIceCream>> GetSavoyIceCream(int id)
        //{
        //    if (_context.savoyIceCreams == null)
        //    {
        //        return NotFound();
        //    }
        //    var savoyIceCream = await _context.savoyIceCreams.FindAsync(id);

        //    if (savoyIceCream == null)
        //    {
        //        return NotFound();
        //    }

        //    return savoyIceCream;
        //}


        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutSavoyIceCream(int id, SavoyIceCream savoyIceCream)
        //{
        //    if (id != savoyIceCream.SavoyIceCreamId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(savoyIceCream).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!SavoyIceCreamExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}
        
        [HttpPost("InsertSavoyData")]
        public async Task<ActionResult<int>> InsertSavoyData(List<SavoyIceCreamDTO> savoyIceCreamVM)
        {
            return Ok(await _savoyService.InsertSavoyData(savoyIceCreamVM));
        }


        //// DELETE: api/SavoyIceCreams/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteSavoyIceCream(int id)
        //{
        //    if (_context.savoyIceCreams == null)
        //    {
        //        return NotFound();
        //    }
        //    var savoyIceCream = await _context.savoyIceCreams.FindAsync(id);
        //    if (savoyIceCream == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.savoyIceCreams.Remove(savoyIceCream);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool SavoyIceCreamExists(int id)
        //{
        //    return (_context.savoyIceCreams?.Any(e => e.SavoyIceCreamId == id)).GetValueOrDefault();
        //}
    }
}
