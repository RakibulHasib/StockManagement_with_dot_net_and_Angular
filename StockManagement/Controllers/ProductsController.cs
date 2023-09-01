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
            List<ProductDto>? products = null;
            if (companyId == 1)
            {
                products = await _unitOfWork.Product.Queryable
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
            }
            else if (companyId == 2)
            {
                products = await _unitOfWork.Product.Queryable
                                            .Where(x => x.IsActive == 1 && x.CompanyId == companyId)
                                            .Select(x => new ProductDto
                                            {
                                                ProductId = x.ProductId,
                                                ProductName = x.ProductName,
                                                CompanyId = x.CompanyId,
                                                Eja = x.LovelloIceCreams.OrderByDescending(x => x.CreatedDate)
                                                                      .Select(x => x.Eja ?? 0)
                                                                      .FirstOrDefault()
                                            }).ToListAsync();
            }
            else if (companyId == 3)
            {
                products = await _unitOfWork.Product.Queryable
                                            .Where(x => x.IsActive == 1 && x.CompanyId == companyId)
                                            .Select(x => new ProductDto
                                            {
                                                ProductId = x.ProductId,
                                                ProductName = x.ProductName,
                                                CompanyId = x.CompanyId,
                                                Eja = x.IglooIceCreams.OrderByDescending(x => x.CreatedDate)
                                                                      .Select(x => x.Eja ?? 0)
                                                                      .FirstOrDefault()
                                            }).ToListAsync();
            }
            else if (companyId == 4)
            {
                products = await _unitOfWork.Product.Queryable
                                            .Where(x => x.IsActive == 1 && x.CompanyId == companyId)
                                            .Select(x => new ProductDto
                                            {
                                                ProductId = x.ProductId,
                                                ProductName = x.ProductName,
                                                CompanyId = x.CompanyId,
                                                Eja = x.ZaNZeeIceCreams.OrderByDescending(x => x.CreatedDate)
                                                                      .Select(x => x.Eja ?? 0)
                                                                      .FirstOrDefault()
                                            }).ToListAsync();
            }
            else if (companyId == 5)
            {
                products = await _unitOfWork.Product.Queryable
                                            .Where(x => x.IsActive == 1 && x.CompanyId == companyId)
                                            .Select(x => new ProductDto
                                            {
                                                ProductId = x.ProductId,
                                                ProductName = x.ProductName,
                                                CompanyId = x.CompanyId,
                                                Eja = x.KaziFarmFoods.OrderByDescending(x => x.CreatedDate)
                                                                      .Select(x => x.Eja ?? 0)
                                                                      .FirstOrDefault()
                                            }).ToListAsync();
            }
            if (products == null)
            {
                return NotFound();
            }

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
