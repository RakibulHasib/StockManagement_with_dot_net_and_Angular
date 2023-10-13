using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using StockManagement.Entities;

namespace StockManagement.ContextConfiguration;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasOne(x => x.Company)
        .WithMany(x => x.Products)
        .IsRequired(false)
        .HasForeignKey(x => x.CompanyId);
    }

}
