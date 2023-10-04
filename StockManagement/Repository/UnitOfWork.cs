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
        public Repository<SavoyIceCreamMaster_tbl,int> SavoyIceCreamMaster_tbl { get; }

        public Repository<ZaNZeeIceCream, int> ZaNZeeIceCream { get; }
        public Repository<ZaNZeeIceCreamMaster_tbl,int> ZaNZeeIceCreamMaster_tbl { get; }

        public Repository<LovelloIceCream, int> LovelloIceCream { get; }
        public Repository<LovelloIceCreamMaster_tbl,int> LovelloIceCreamMaster_tbl { get; }
        public Repository<IglooIceCream, int> IglooIceCream { get; }
        public Repository<IglooIceCreamMaster_tbl, int> IglooIceCreamMaster_tbl { get; }
        public Repository<KaziFarmFood, int> KaziFarmFood { get; }
        public Repository<KaziFarmFoodMaster_tbl, int> KaziFarmFoodMaster_tbl { get; }

        public UnitOfWork(StockDBContext context, Repository<Product, int> product, Repository<Company, int> company, Repository<SavoyIceCream, int> savoyIceCream, Repository<ZaNZeeIceCream, int> zaNZeeIceCream, Repository<LovelloIceCream, int> lovelloIceCream, Repository<IglooIceCream, int> iglooIceCream, Repository<KaziFarmFood, int> kaziFarmFood, Repository<SavoyIceCreamMaster_tbl, int> savoyIceCreamMaster_tbl, Repository<ZaNZeeIceCreamMaster_tbl, int> zaNZeeIceCreamMaster_tbl, Repository<LovelloIceCreamMaster_tbl, int> lovelloIceCreamMaster_tbl, Repository<IglooIceCreamMaster_tbl, int> iglooIceCreamMaster_tbl, Repository<KaziFarmFoodMaster_tbl, int> kaziFarmFoodMaster_tbl)
        {
            this.context = context;
            Product = product;
            Company = company;
            SavoyIceCream = savoyIceCream;
            ZaNZeeIceCream = zaNZeeIceCream;
            LovelloIceCream = lovelloIceCream;
            IglooIceCream = iglooIceCream;
            KaziFarmFood = kaziFarmFood;
            SavoyIceCreamMaster_tbl = savoyIceCreamMaster_tbl;
            ZaNZeeIceCreamMaster_tbl = zaNZeeIceCreamMaster_tbl;
            LovelloIceCreamMaster_tbl = lovelloIceCreamMaster_tbl;
            IglooIceCreamMaster_tbl = iglooIceCreamMaster_tbl;
            KaziFarmFoodMaster_tbl = kaziFarmFoodMaster_tbl;
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
