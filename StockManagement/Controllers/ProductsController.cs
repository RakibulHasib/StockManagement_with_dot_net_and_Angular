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


    [Transaction]
    [HttpPut("UpdateProductStockLog")]
    public async Task<ActionResult<int>> UpdateProductStockLog(ProducStockLogDTO productStock)
    {
        return Ok(await _productService.UpdateProductStock(productStock));
    }


    [HttpGet("{companyId}")]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProduct(int companyId)
    {
        var products = await _unitOfWork.Product.Queryable
                .Where(x => x.CompanyId == companyId && x.IsDeleted == 0 && x.IsActive == 1)
                .Select(x => new ProductDto
                {
                    ProductId = x.ProductId,
                    ProductName = x.ProductName,
                    Price = x.Price,
                    Eja = x.StockDetails.Where(a => a.IsDeleted == 0)
                                        .OrderByDescending(x => x.CreationTime)
                                        .Select(x => x.Eja ?? 0)
                                        .FirstOrDefault(),
                    NewProduct = x.Quantity
                }).ToListAsync();

        if (products.Any())
        {
            var distributeData = await (from sd in _unitOfWork.SalesDistribute.Queryable.Where(a => a.IsDeleted == 0 && a.Status == 1)
                              join sdd in _unitOfWork.SalesDistributeDetail.Queryable.Where(a => a.IsDeleted == 0) on sd.SalesDistributeId equals sdd.SalesDistributeId
                              where sd.CompanyId == companyId
                              select new
                              {
                                  sdd.ProductId,
                                  sdd.SalesQuantity
                              }).ToListAsync();


            if (distributeData.Any())
            {
                foreach (var item in products)
                {
                    item.SalesQuantity = distributeData?.Where(x => x.ProductId == item.ProductId).Sum(a => a.SalesQuantity) ?? 0;
                }
            }
        }
        return products;
    }

    public sealed class ProductDto
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public decimal? Price { get; set; }
        public int Eja { get; set; }
        public int NewProduct { get; set; }
        public int SalesQuantity { get; set; }
    }

}
