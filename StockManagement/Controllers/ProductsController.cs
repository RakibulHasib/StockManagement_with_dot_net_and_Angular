using Microsoft.AspNetCore.Authorization;
using StockManagement.Helpers;

namespace StockManagement.Controllers;

[Route("api/[controller]")]
[ApiController]
//[Authorize]
public class ProductsController : ControllerBase
{
    private readonly UnitOfWork _unitOfWork;
    private readonly ProductService _productService;

    public ProductsController(UnitOfWork unitOfWork, ProductService productService)
    {
        _unitOfWork = unitOfWork;
        _productService = productService;
    }

    [HttpGet("ProductDashboard/{companyId}")]
    public async Task<ActionResult<IEnumerable<GetProductData>>> ProductDashboard(int companyId)
    {
        return Ok(await _productService.GetProducCompanyWise(companyId));
    }

    [HttpGet("GetProductByID/{ProductId}")]
    public async Task<ActionResult<ProductDTO>> GetProductByID(int ProductId)
    {
        return await _productService.GetProducByID(ProductId);
    }

    [Transaction]
    [HttpPost("InsertNewProduct")]
    public async Task<ActionResult<int>> InsertNewProduct(ProductDTO product)
    {
        return Ok(await _productService.InsertProduct(product));
    }


    [Transaction]
    [HttpPut("UpdateProduct")]
    public async Task<ActionResult<int>> UpdateProduct(ProductDTO product)
    {
        return Ok(await _productService.UpdateProduct(product));
    }


    [Transaction]
    [HttpPut("delete-product/{productId}")]
    public async Task<ActionResult<int>> DeleteProduct(int productId)
    {
        return Ok(await _productService.DeleteProduct(productId));
    }




    [HttpGet("{companyId}")]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProduct(int companyId)
    {
        var products = await (from p in _unitOfWork.Product.Queryable
                              let salesQ = _unitOfWork.SalesDistributeDetail.Queryable.Where(a => a.CreationTime.Date == DateTime.Now.Date && a.ProductId == p.ProductId && a.IsDeleted == 0).Sum(a => a.SalesQuantity)
                              where p.IsActive == 1 && p.CompanyId == companyId
                              select new ProductDto
                              {
                                  ProductId = p.ProductId,
                                  ProductName = p.ProductName,
                                  Price = p.Price ?? 0,
                                  Eja = p.StockDetails.Where(a => a.IsDeleted == 0)
                                                      .OrderByDescending(x => x.CreationTime)
                                                      .Select(x => x.Eja ?? 0)
                                                      .FirstOrDefault(),
                                  SalesQuantity = salesQ
                              }).ToListAsync();

        return products;
    }

    public sealed class ProductDto
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public decimal Price { get; set; }
        public int Eja { get; set; }
        public int SalesQuantity { get; set; }
    }

}
