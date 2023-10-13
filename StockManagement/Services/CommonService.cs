using Contexts;
using Entities;
using Microsoft.AspNetCore.Mvc;
using StockManagement.DTO;
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


        public async Task<ActionResult<int>> InsertIglooData(List<IglooIceCreamDTO> iglooIceCreamVM)
        {
            int result = 0;
            foreach (var item in iglooIceCreamVM)
            {
                var iglooIceCream = new StockDetail
                {
                    CompanyId = item.CompanyId,
                    ProductId = item.ProductId,
                    Eja = (item.Total ?? 0) - (item.SalesQuantity ?? 0),
                    Price = item.Price,
                    RestockQuantity = item.NewProduct,
                    TotalQuantity = item.Total,
                    SalesQuantity = item.SalesQuantity,
                    TotalAmount = item.TotalAmount,
                    Dumping = item.Dumping,
                    Receive = item.Receive,
                    Remaining = item.Remaining,
                };
                await _unitOfWork.StockDetail.AddAsync(iglooIceCream);
            }

            result = await _unitOfWork.SaveChangesAsync();
            return result;
        }
    }
}
