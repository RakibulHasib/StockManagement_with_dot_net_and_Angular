using Microsoft.AspNetCore.Mvc;
using StockManagement.Features.CompanyFeatures;
using StockManagement.Features.SalesDistributeFeatures;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConcernCompanyMappingController : BaseController<CompanyController>
    {
        [HttpGet("GetConcernPersonCompanyMapping")]
        public async Task<ActionResult<IEnumerable<ConcernCompanyMappingDto>>> GetConcernPersonCompanyMapping()
        {
            return await _mediator.Send(new GetConcernCompanyMappingQuery());
        }

        // GET api/<ConcernCompanyMappingController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ConcernCompanyMappingController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ConcernCompanyMappingController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ConcernCompanyMappingController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
