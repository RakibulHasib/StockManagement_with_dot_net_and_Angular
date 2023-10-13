using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagement.Repository;

namespace StockManagement.Controllers;

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
        var company = await _unitOfWork.Company.Queryable
            .AsNoTracking()
            .Where(x => x.CompanyId == companyId)
            .FirstOrDefaultAsync();

        if (company is null)
            return NotFound();


        var products = await _unitOfWork.Product.Queryable
                        .Where(x => x.IsActive == 1 && x.CompanyId == companyId)
                        .Select(x => new ProductDto
                        {
                            ProductId = x.ProductId,
                            ProductName = x.ProductName,
                            Price = x.Price ?? 0,
                            Eja = x.StockDetails.OrderByDescending(x => x.CreationTime)
                                                    .Select(x => x.Eja ?? 0)
                                                    .FirstOrDefault()
                        }).ToListAsync();

        return products;
    }

    public sealed class ProductDto
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public decimal Price { get; set; }
        public int Eja { get; set; }
    }

}
