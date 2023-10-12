using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagement.DTO;
using StockManagement.Model;
using StockManagement.Repository;

namespace StockManagement.Services
{
    public class CommonService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly StockDBContext _db;

        public CommonService(UnitOfWork unitOfWork, StockDBContext db)
        {
            _unitOfWork = unitOfWork;
            _db = db;
        }

        //public async Task<RoleMasterDTO> GetUserRole()
        //{

        //}

        public async Task<ActionResult<int>> InsertCompany(CompanyDTO companyDTO)
        {
            int response = 0;
            var Company = new Company()
            {
                CompanyName = companyDTO.CompanyName,
            };

            await _unitOfWork.Company.AddAsync(Company);
            response = await _db.SaveChangesAsync();

            return response;
        }


        public async Task<ActionResult<int>> InsertIglooData(List<IglooIceCreamDTO> iglooIceCreamVM)
        {
            int result = 0;
            foreach (var item in iglooIceCreamVM)
            {
                var iglooIceCream = new IglooIceCream
                {
                    CompanyId = item.CompanyId,
                    ProductId = item.ProductId,
                    Eja = (item.Total ?? 0) - (item.SalesQuantity ?? 0),
                    Price = item.Price,
                    NewProduct = item.NewProduct,
                    Total = item.Total,
                    SalesQuantity = item.SalesQuantity,
                    TotalAmount = item.TotalAmount,
                    Dumping = item.Dumping,
                    Receive = item.Receive,
                    Remaining = item.Remaining,
                    CreatedDate = DateTime.Now
                };
                await _unitOfWork.IglooIceCream.AddAsync(iglooIceCream);
            }

            result = await _unitOfWork.SaveChangesAsync();
            return result;
        }
    }
}
