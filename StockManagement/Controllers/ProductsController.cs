using StockManagement.Attributes;
using StockManagement.Helpers;

namespace StockManagement.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly UnitOfWork _unitOfWork;
    private readonly ProductService _productService;

    public ProductsController(UnitOfWork unitOfWork, ProductService productService)
    {
        _unitOfWork = unitOfWork;
        _productService = productService;
    }

    [JwtAuthorize]
    [HttpGet("ProductDashboard/{companyId}")]
    public async Task<ActionResult<IEnumerable<GetProductData>>> ProductDashboard(int companyId)
    {
        return Ok(await _productService.GetProducCompanyWise(companyId));
    }

    [JwtAuthorize]
    [HttpGet("GetProductByID/{ProductId}")]
    public async Task<ActionResult<ProductDTO>> GetProductByID(int ProductId)
    {
        return await _productService.GetProducByID(ProductId);
    }

    [JwtAuthorize]
    [Transaction]
    [HttpPost("InsertNewProduct")]
    public async Task<ActionResult<int>> InsertNewProduct(ProductDTO product)
    {
        return Ok(await _productService.InsertProduct(product));
    }

    [JwtAuthorize]
    [Transaction]
    [HttpPut("UpdateProduct")]
    public async Task<ActionResult<int>> UpdateProduct(ProductDTO product)
    {
        return Ok(await _productService.UpdateProduct(product));
    }

    [JwtAuthorize]
    [Transaction]
    [HttpPut("delete-product/{productId}")]
    public async Task<ActionResult<int>> DeleteProduct(int productId)
    {
        return Ok(await _productService.DeleteProduct(productId));
    }

    [JwtAuthorize]
    [Transaction]
    [HttpPut("UpdateProductStockLog")]
    public async Task<ActionResult<int>> UpdateProductStockLog(ProducStockLogDTO productStock)
    {
        return Ok(await _productService.UpdateProductStock(productStock));
    }

    [JwtAuthorize]
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
                    NewProduct = x.NewQuantity
                }).ToListAsync();

        if (products.Any())
        {
            var distributeData = await (from sd in _unitOfWork.SalesDistribute.Queryable.Where(a => a.IsDeleted == 0 && a.Status == 1)
                                        join sdd in _unitOfWork.SalesDistributeDetail.Queryable.Where(a => a.IsDeleted == 0) on sd.SalesDistributeId equals sdd.SalesDistributeId
                                        where sd.CompanyId == companyId
                                        select new
                                        {
                                            sdd.ProductId,
                                            sdd.SalesQuantity,
                                            sdd.ReceiveQuantity,
                                            sdd.ReturnQuantity
                                        }).ToListAsync();


            if (distributeData.Any())
            {
                foreach (var item in products)
                {
                    item.SalesQuantity = distributeData?.Where(x => x.ProductId == item.ProductId).Sum(a => a.SalesQuantity) ?? 0;
                    item.ReceiveQuantity = distributeData?.Where(x => x.ProductId == item.ProductId).Sum(a => a.ReceiveQuantity) ?? 0;
                    item.ReturnQuantity = distributeData?.Where(x => x.ProductId == item.ProductId).Sum(a => a.ReturnQuantity) ?? 0;
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
        public int ReceiveQuantity { get; set; }
        public int ReturnQuantity { get; set; }
    }

}
