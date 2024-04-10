using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using StockManagement.DTO;
using StockManagement.Entities;
using StockManagement.Repository;
using StockManagement.Services;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

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

        [HttpGet("GetProducStock/{companyId}")]
        public async Task<IEnumerable<ProductStockDTO>> GetProducStock(int CompanyId)
        {
            var products = await _unitofwork.Product.Queryable
                .Where(product => product.CompanyId == CompanyId)
                .ToListAsync();

            var lastStockPerProduct = await _unitofwork.StockDetail.Queryable
                .Where(a => a.CompanyId == CompanyId)
                .GroupBy(stock => stock.ProductId)
                .Select(group => group.OrderByDescending(stock => stock.CreationTime).FirstOrDefault())
                .ToListAsync();

            var productsWithStock = from product in products
                                    join stock in lastStockPerProduct
                                    on product.ProductId equals stock.ProductId into productStock
                                    from ps in productStock.DefaultIfEmpty()
                                    select new ProductStockDTO
                                    {
                                        ProductId = product.ProductId,
                                        ProductName = product.ProductName,
                                        Price = product.Price,
                                        CurrentStock = ps?.Eja ?? 0
                                    };

            return productsWithStock.ToList();
        }

    }
}
