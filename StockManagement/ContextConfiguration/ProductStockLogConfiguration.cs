using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StockManagement.ContextConfiguration;
public class ProductStockLogConfiguration : IEntityTypeConfiguration<ProductStockLog>
{
    public void Configure(EntityTypeBuilder<ProductStockLog> builder)
    {
        builder.HasOne(x => x.Product)
        .WithMany(x => x.ProductStockLogs)
        .IsRequired(false)
        .HasForeignKey(x => x.ProductId);
    }
}

