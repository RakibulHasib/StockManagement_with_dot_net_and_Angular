using Microsoft.EntityFrameworkCore;

namespace StockManagement.Model
{

    public class StockDBContext : DbContext
    {
        public StockDBContext(DbContextOptions<StockDBContext> options) : base(options) { }

        public DbSet<SavoyIceCream> savoyIceCreams { get; set; }
        public DbSet<SavoyIceCreamMaster_tbl> savoyIceCreamMaster_tbl { get; set; }
        public DbSet<ZaNZeeIceCream> zaNZeeIceCreams { get; set; }
        public DbSet <ZaNZeeIceCreamMaster_tbl> zaNZeeIceCreamMaster_Tbl { get; set; }
        public DbSet<LovelloIceCream> lovelloIceCreams { get; set; }
        public DbSet<LovelloIceCreamMaster_tbl> lovelloIceCreamMaster_Tbl { get; set; }
        public DbSet<IglooIceCream> iglooIceCreams { get; set; }
        public DbSet<IglooIceCreamMaster_tbl> iglooIceCreamMaster_Tbl { get; set; } 
        public DbSet<KaziFarmFood> kaziFarmFoods { get; set; }
        public DbSet<KaziFarmFoodMaster_tbl> kaziFarmFoodMaster_Tbl { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<Gari1> gari1 { get; set; }
        public DbSet<Gari1Master_tbl> gari1Master_Tbl { get; set; }
        public DbSet<Gari2> gari2 { get; set; }
        public DbSet<Gari2Master_tbl> gari2Master_Tbl { get; set; }
        public DbSet<Gari3> gari3 { get; set; }
        public DbSet<Gari3Master_tbl> gari3Master_Tbl { get; set; }
        public DbSet<User> Users { get; set; } = default!;
        public DbSet<RoleMaster> RoleMaster { get; set; } = default!;
        public DbSet<RoleAssagin> RoleAssagin { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IglooIceCream>()
                .HasOne(x => x.Product)
                .WithMany(x => x.IglooIceCreams)
                .HasForeignKey(x => x.ProductId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<IglooIceCream>()
                .HasOne(x => x.Company)
                .WithMany(x => x.IglooIceCreams)
                .HasForeignKey(x => x.CompanyId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<KaziFarmFood>()
                .HasOne(x => x.Product)
                .WithMany(x => x.KaziFarmFoods)
                .HasForeignKey(x => x.ProductId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<KaziFarmFood>()
                .HasOne(x => x.Company)
                .WithMany(x => x.KaziFarmFoods)
                .HasForeignKey(x => x.CompanyId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<LovelloIceCream>()
                .HasOne(x => x.Product)
                .WithMany(x => x.LovelloIceCreams)
                .HasForeignKey(x => x.ProductId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<LovelloIceCream>()
                .HasOne(x => x.Company)
                .WithMany(x => x.LovelloIceCreams)
                .HasForeignKey(x => x.CompanyId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<SavoyIceCream>()
                .HasOne(x => x.Product)
                .WithMany(x => x.SavoyIceCreams)
                .HasForeignKey(x => x.ProductId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<SavoyIceCream>()
                .HasOne(x => x.Company)
                .WithMany(x => x.SavoyIceCreams)
                .HasForeignKey(x => x.CompanyId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ZaNZeeIceCream>()
                .HasOne(x => x.Product)
                .WithMany(x => x.ZaNZeeIceCreams)
                .HasForeignKey(x => x.ProductId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ZaNZeeIceCream>()
                .HasOne(x => x.Company)
                .WithMany(x => x.ZaNZeeIceCreams)
                .HasForeignKey(x => x.CompanyId)
                .OnDelete(DeleteBehavior.NoAction);
        }

    }
}
