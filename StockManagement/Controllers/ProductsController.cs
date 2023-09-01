using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagement.Model;
using StockManagement.Repository;
using System.Reflection.Metadata.Ecma335;

namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        public ProductsController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("{companyId}")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProduct(int companyId)
        {
            var products = await _unitOfWork.Product.Queryable
                .Where(x => x.IsActive == 1 && x.CompanyId == companyId)
                .Select(x => new ProductDto
                {
                    ProductId = x.ProductId,
                    ProductName = x.ProductName,
                    CompanyId = x.CompanyId,
                    Eja = x.SavoyIceCreams.OrderByDescending(x => x.CreatedDate)
                                            .Select(x => x.Eja ?? 0)
                                            .FirstOrDefault()
                }).ToListAsync();

            return products;
        }

        public sealed class ProductDto
        {
            public int ProductId { get; set; }
            public string? ProductName { get; set; }
            public int CompanyId { get; set; }
            public int Eja { get; set; }
        }

    }
}
