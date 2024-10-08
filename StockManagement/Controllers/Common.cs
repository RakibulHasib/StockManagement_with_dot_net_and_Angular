namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Common : ControllerBase
    {
        private readonly UnitOfWork _unitofwork;

        public Common(UnitOfWork unitofwork)
        {
            _unitofwork = unitofwork;
        }

        [JwtAuthorize]
        [HttpGet("GetCompanySalesPriceWeekly")]
        public async Task<ActionResult<List<CompanySalesPriceWeeklyDTO>>> GetCompanySalesPriceWeekly()
        {
            DateTime endDate = DateTime.Now.Date;
            DateTime startDate = endDate.AddDays(-30);
            var salesData = await _unitofwork.Company.Queryable
                .GroupJoin(
                    _unitofwork.Stock.Queryable
                    .Where(x => x.CreationTime.Date >= startDate && x.CreationTime.Date <= endDate && x.IsDeleted == 0),
                    company => company.CompanyId,
                    stock => stock.CompanyId,
                    (company, stock) => new { Company = company, Stock = stock }
                    )
                .SelectMany(
                x => x.Stock.DefaultIfEmpty(),
                (company, stock) => new { Company = company, Stock = stock }
                )
                .GroupBy(a => a.Company.Company.CompanyId)
                .Select(a => new CompanySalesPriceWeeklyDTO
                {
                    CompanyID = a.Key,
                    CompanyName = a.Max(x => x.Company.Company.CompanyName),
                    SalesQuantity = a.Sum(x => x.Stock.TotalSalesQuantity),
                    SalesPrice = a.Sum(x => x.Stock.TotalPrice)
                }).ToListAsync();

            return salesData;
        }

        [JwtAuthorize]
        [HttpGet("GetProducStock/{companyId}")]
        public async Task<IEnumerable<ProductStockDTO>> GetProducStock(int CompanyId)
        {
            var products = await _unitofwork.Product.Queryable
                .Where(product => product.CompanyId == CompanyId && product.IsDeleted == 0)
                .Select(x => new ProductStockDTO
                {
                    ProductId = x.ProductId,
                    ProductName = x.ProductName,
                    Price = x.Price,
                    CurrentStock = x.StockQuantity
                }).ToListAsync();

            return products;
        }

    }
}
