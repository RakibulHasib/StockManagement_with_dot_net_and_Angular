using Contexts;
using Entities;
using Microsoft.EntityFrameworkCore.Storage;

namespace StockManagement.Repository
{
    public class UnitOfWork : IDisposable
    {
        private readonly StockDBContext context;

        public Repository<Product, int> Product { get; }

        public Repository<Company, int> Company { get; }

        public Repository<Stock, long> Stock { get; }
        public Repository<StockDetail,Guid> StockDetail { get; }

        public Repository<SalesDistribute, long> SalesDistribute { get; }
        public Repository<SalesDistributeDetail, Guid> SalesDistributeDetail { get; }


        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await context.SaveChangesAsync(cancellationToken);
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default)
        {
            return await context.Database.BeginTransactionAsync(cancellationToken);
        }

        private bool disposed;

        public UnitOfWork(StockDBContext context, Repository<Product, int> product, Repository<Company, int> company, Repository<Stock, long> stock, Repository<StockDetail, Guid> stockDetail, Repository<SalesDistribute, long> salesDistribute, Repository<SalesDistributeDetail, Guid> salesDistributeDetail)
        {
            this.context = context;
            Product = product;
            Company = company;
            Stock = stock;
            StockDetail = stockDetail;
            SalesDistribute = salesDistribute;
            SalesDistributeDetail = salesDistributeDetail;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            disposed = true;
        }
    }
}
