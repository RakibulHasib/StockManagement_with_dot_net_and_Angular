using Microsoft.EntityFrameworkCore.Storage;
using StockManagement.Model;

namespace StockManagement.Repository
{
    public class UnitOfWork : IDisposable
    {
        private readonly StockDBContext context;

        public Repository<Product, int> Product { get; }

        public Repository<Company, int> Company { get; }

        public Repository<SavoyIceCream, int> SavoyIceCream { get; }

        public Repository<ZaNZeeIceCream, int> ZaNZeeIceCream { get; }

        public Repository<LovelloIceCream, int> LovelloIceCream { get; }
        public Repository<IglooIceCream, int> IglooIceCream { get; }
        public Repository<KaziFarmFood, int> KaziFarmFood { get; }

        public UnitOfWork(StockDBContext context, Repository<Product, int> product, Repository<Company, int> company, Repository<SavoyIceCream, int> savoyIceCream, Repository<ZaNZeeIceCream, int> zaNZeeIceCream, Repository<LovelloIceCream, int> lovelloIceCream, Repository<IglooIceCream, int> iglooIceCream, Repository<KaziFarmFood, int> kaziFarmFood)
        {
            this.context = context;
            Product = product;
            Company = company;
            SavoyIceCream = savoyIceCream;
            ZaNZeeIceCream = zaNZeeIceCream;
            LovelloIceCream = lovelloIceCream;
            IglooIceCream = iglooIceCream;
            KaziFarmFood = kaziFarmFood;
        }
        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await context.SaveChangesAsync(cancellationToken);
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default)
        {
            return await context.Database.BeginTransactionAsync(cancellationToken);
        }

        private bool disposed;
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
