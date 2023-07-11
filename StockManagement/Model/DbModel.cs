using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using StockManagement.Model;

namespace StockManagement.Model
{
    public class SavoyIceCream
    {
        public int SavoyIceCreamId { get; set; }
        public string? ProductName { get; set; }
        public int? Eja { get; set; }
        public decimal Price { get; set; }
        public int? NewProduct { get; set; }
        public int? Total { get; set; }
        public int? SalesQuantity { get; set; }
        public decimal? TotalAmount { get; set; }
        public int? Dumping { get; set; }
        public int? Receive { get; set; }
        public int? Remaining { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
    public class ZaNZeeIceCream
    {
        public int ZaNZeeIceCreamId { get; set; }
        public string? ProductName { get; set; }
        public int? Eja { get; set; }
        public decimal Price { get; set; }
        public int? NewProduct { get; set; }
        public int? Total { get; set; }
        public int? SalesQuantity { get; set; }
        public decimal? TotalAmount { get; set; }
        public int? Dumping { get; set; }
        public int? Receive { get; set; }
        public int? Remaining { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
    public class LovelloIceCream
    {
        public int LovelloIceCreamId { get; set; }
        public string? ProductName { get; set; }
        public int? Eja { get; set; }
        public decimal Price { get; set; }
        public int? NewProduct { get; set; }
        public int? Total { get; set; }
        public int? SalesQuantity { get; set; }
        public decimal? TotalAmount { get; set; }
        public int? Dumping { get; set; }
        public int? Receive { get; set; }
        public int? Remaining { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
    public class IglooIceCream
    {
        public int IglooIceCreamId { get; set; }
        public string? ProductName { get; set; }
        public int? Eja { get; set; }
        public decimal Price { get; set; }
        public int? NewProduct { get; set; }
        public int? Total { get; set; }
        public int? SalesQuantity { get; set; }
        public decimal? TotalAmount { get; set; }
        public int? Dumping { get; set; }
        public int? Receive { get; set; }
        public int? Remaining { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
    public class KaziFarmFood
    {
        public int KaziFarmFoodId { get; set; }
        public string? ProductName { get; set; }
        public int? Eja { get; set; }
        public decimal Price { get; set; }
        public int? NewProduct { get; set; }
        public int? Total { get; set; }
        public int? SalesQuantity { get; set; }
        public decimal? TotalAmount { get; set; }
        public int? Dumping { get; set; }
        public int? Receive { get; set; }
        public int? Remaining { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
    public class Product
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public virtual ICollection<Gari1> Gari1s { get; set; } = new HashSet<Gari1>();
        public virtual ICollection<Gari2> Gari2s { get; set; } = new HashSet<Gari2>();
        public virtual ICollection<Gari3> Gari3s { get; set; } = new HashSet<Gari3>();
    }
    public class Gari1
    {
        public int Gari1Id { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public decimal Price { get; set; }
        public int Receive { get; set; }
        public int Return { get; set; }
        public int Sales { get; set; }
        public decimal Total { get; set; }
        public virtual Product Product { get; set; }
    }
    public class Gari2
    {
        public int Gari2Id { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public decimal Price { get; set; }
        public int Receive { get; set; }
        public int Return { get; set; }
        public int Sales { get; set; }
        public decimal Total { get; set; }
        public virtual Product Product { get; set; }
    }
    public class Gari3
    {
        public int Gari3Id { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public decimal Price { get; set; }
        public int Receive { get; set; }
        public int Return { get; set; }
        public int Sales { get; set; }
        public decimal Total { get; set; }
        public virtual Product Product { get; set; }
    }

    public class StockDBContext : DbContext
    {
        public StockDBContext(DbContextOptions<StockDBContext> options):base(options) { }

        public DbSet<SavoyIceCream> savoyIceCreams { get; set; }
        public DbSet<ZaNZeeIceCream> zaNZeeIceCreams { get; set; }
        public DbSet<LovelloIceCream> lovelloIceCreams { get; set; }
        public DbSet<IglooIceCream> iglooIceCreams { get; set; }
        public DbSet<KaziFarmFood> kaziFarmFoods { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<Gari1> gari1 { get; set; }
        public DbSet<Gari2> gari2 { get; set; }
        public DbSet<Gari3> gari3 { get; set; }

    }


public static class SavoyIceCreamEndpoints
{
	public static void MapSavoyIceCreamEndpoints (this IEndpointRouteBuilder routes)
    {
        routes.MapGet("/api/SavoyIceCream", async (StockDBContext db) =>
        {
            return await db.savoyIceCreams.ToListAsync();
        })
        .WithName("GetAllSavoyIceCreams");

        routes.MapGet("/api/SavoyIceCream/{id}", async (int SavoyIceCreamId, StockDBContext db) =>
        {
            return await db.savoyIceCreams.FindAsync(SavoyIceCreamId)
                is SavoyIceCream model
                    ? Results.Ok(model)
                    : Results.NotFound();
        })
        .WithName("GetSavoyIceCreamById");

        routes.MapPut("/api/SavoyIceCream/{id}", async (int SavoyIceCreamId, SavoyIceCream savoyIceCream, StockDBContext db) =>
        {
            var foundModel = await db.savoyIceCreams.FindAsync(SavoyIceCreamId);

            if (foundModel is null)
            {
                return Results.NotFound();
            }

            db.Update(savoyIceCream);

            await db.SaveChangesAsync();

            return Results.NoContent();
        })
        .WithName("UpdateSavoyIceCream");

        routes.MapPost("/api/SavoyIceCream/", async (SavoyIceCream savoyIceCream, StockDBContext db) =>
        {
            db.savoyIceCreams.Add(savoyIceCream);
            await db.SaveChangesAsync();
            return Results.Created($"/SavoyIceCreams/{savoyIceCream.SavoyIceCreamId}", savoyIceCream);
        })
        .WithName("CreateSavoyIceCream");


        routes.MapDelete("/api/SavoyIceCream/{id}", async (int SavoyIceCreamId, StockDBContext db) =>
        {
            if (await db.savoyIceCreams.FindAsync(SavoyIceCreamId) is SavoyIceCream savoyIceCream)
            {
                db.savoyIceCreams.Remove(savoyIceCream);
                await db.SaveChangesAsync();
                return Results.Ok(savoyIceCream);
            }

            return Results.NotFound();
        })
        .WithName("DeleteSavoyIceCream");
    }
}}
