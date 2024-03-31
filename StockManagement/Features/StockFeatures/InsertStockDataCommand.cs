using MediatR;
using Microsoft.EntityFrameworkCore;
using StockManagement.DTO;
using StockManagement.Entities;
using StockManagement.Repository;

namespace StockManagement.Features.StockFeatures
{
    public class InsertStockDataCommand:IRequest<int>
    {
        public int companyId { get; set; }
        private List<StockDTO> savoyIceCreamVM;
        internal sealed class InsertStockDataCommandHandler : IRequestHandler<InsertStockDataCommand, int>
        {
            private readonly UnitOfWork _unitOfWork;

            public InsertStockDataCommandHandler(UnitOfWork unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }

            public async Task<int> Handle(InsertStockDataCommand request, CancellationToken cancellationToken)
            {
                int result = 0;
                Stock master = new Stock
                {
                    CompanyId = request.companyId,
                    TotalEja = 0,
                    TotalPrice = 0,
                    TotalNewProduct = 0,
                    GrandTotal = 0,
                    TotalSalesQuantity = 0,
                    GrandTotalAmount = 0,
                    IsDeleted = 0
                };
                await _unitOfWork.Stock.AddAsync(master);
                await _unitOfWork.SaveChangesAsync();

                foreach (var item in request.savoyIceCreamVM)
                {
                    var total = (item.Eja ?? 0) + (item.NewProduct);
                    var stockDetails = new StockDetail
                    {
                        StockDetailsId = Guid.NewGuid(),
                        StockId = master.StockId,
                        CompanyId = request.companyId,
                        ProductId = item.ProductId,
                        Price = item.Price,
                        RestockQuantity = item.NewProduct,
                        TotalQuantity = total,
                        Eja = total - (item.SalesQuantity ?? 0),
                        SalesQuantity = item.SalesQuantity,
                        TotalAmount = (item.SalesQuantity) * (item.Price),
                        DamageQuantity = item.DamageQuantity ?? 0,
                        IsDeleted = 0
                    };
                    await _unitOfWork.StockDetail.AddAsync(stockDetails);
                }
                await _unitOfWork.SaveChangesAsync();

                master.TotalEja = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.Eja ?? 0);
                master.TotalPrice = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.Price);
                master.TotalNewProduct = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.RestockQuantity ?? 0);
                master.GrandTotal = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.TotalQuantity ?? 0);
                master.TotalSalesQuantity = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.SalesQuantity ?? 0);
                master.GrandTotalAmount = await _unitOfWork.StockDetail.Queryable.Where(a => a.StockId == master.StockId).SumAsync(a => a.TotalAmount ?? 0);

                _unitOfWork.Stock.Update(master);
                result = await _unitOfWork.SaveChangesAsync();
                return result;
            }
        }
    }
}
