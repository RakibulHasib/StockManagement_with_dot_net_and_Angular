﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagement.Model;

namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavoyIceCreamsController : ControllerBase
    {
        private readonly StockDBContext _context;

        public SavoyIceCreamsController(StockDBContext context)
        {
            _context = context;
        }

        // GET: api/SavoyIceCreams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SavoyIceCream>>> GetsavoyIceCreams()
        {
          if (_context.savoyIceCreams == null)
          {
              return NotFound();
          }
            return await _context.savoyIceCreams.ToListAsync();
        }

        // GET: api/SavoyIceCreams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SavoyIceCream>> GetSavoyIceCream(int id)
        {
          if (_context.savoyIceCreams == null)
          {
              return NotFound();
          }
            var savoyIceCream = await _context.savoyIceCreams.FindAsync(id);

            if (savoyIceCream == null)
            {
                return NotFound();
            }

            return savoyIceCream;
        }

        // PUT: api/SavoyIceCreams/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSavoyIceCream(int id, SavoyIceCream savoyIceCream)
        {
            if (id != savoyIceCream.SavoyIceCreamId)
            {
                return BadRequest();
            }

            _context.Entry(savoyIceCream).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SavoyIceCreamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SavoyIceCreams
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SavoyIceCream>> PostSavoyIceCream(SavoyIceCream savoyIceCream)
        {
          if (_context.savoyIceCreams == null)
          {
              return Problem("Entity set 'StockDBContext.savoyIceCreams'  is null.");
          }
            _context.savoyIceCreams.Add(savoyIceCream);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSavoyIceCream", new { id = savoyIceCream.SavoyIceCreamId }, savoyIceCream);
        }

        // DELETE: api/SavoyIceCreams/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSavoyIceCream(int id)
        {
            if (_context.savoyIceCreams == null)
            {
                return NotFound();
            }
            var savoyIceCream = await _context.savoyIceCreams.FindAsync(id);
            if (savoyIceCream == null)
            {
                return NotFound();
            }

            _context.savoyIceCreams.Remove(savoyIceCream);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SavoyIceCreamExists(int id)
        {
            return (_context.savoyIceCreams?.Any(e => e.SavoyIceCreamId == id)).GetValueOrDefault();
        }
    }
}
