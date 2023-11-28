using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagement.DTO;
using StockManagement.Repository;
using StockManagement.Services;

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
        public async Task<ActionResult<CompanySalesPriceWeeklyDTO>> GetCompanySalesPriceWeekly()
        {
            DateTime endDate = DateTime.Now.Date;
            DateTime startDate = endDate.AddDays(-30);

            var companyIds = new List<int> { 1, 2, 3, 4, 5 };

            var companyData = new Dictionary<int, (int SalesQuantity, decimal Price)>();

            foreach (var companyId in companyIds)
            {
                var salesData = await _unitofwork.Stock.Queryable
                    .Where(a => a.CompanyId == companyId && a.CreationTime.Date >= startDate && a.CreationTime.Date <= endDate)
                    .GroupBy(a => a.CompanyId)
                    .Select(g => new
                    {
                        SalesQuantity = g.Sum(a => a.TotalSalesQuantity),
                        Price = g.Sum(a => a.TotalPrice)
                    })
                    .FirstOrDefaultAsync();

                if (salesData != null)
                {
                    companyData[companyId] = (salesData.SalesQuantity, salesData.Price);
                }
            }

            var data = new CompanySalesPriceWeeklyDTO
            {
                SavoySalesQ = companyData.GetValueOrDefault(1).SalesQuantity,
                SavoySalesP = companyData.GetValueOrDefault(1).Price,
                ZanZeeSalesQ = companyData.GetValueOrDefault(2).SalesQuantity,
                ZanZeeSalesP = companyData.GetValueOrDefault(2).Price,
                LovelloSalesQ = companyData.GetValueOrDefault(3).SalesQuantity,
                LovelloSalesP = companyData.GetValueOrDefault(3).Price,
                KaziFarmSalesQ = companyData.GetValueOrDefault(4).SalesQuantity,
                KaziFarmSalesP = companyData.GetValueOrDefault(4).Price,
                IglooSalesQ = companyData.GetValueOrDefault(5).SalesQuantity,
                IglooSalesP = companyData.GetValueOrDefault(5).Price
            };

            return data;
        }

    }
}
