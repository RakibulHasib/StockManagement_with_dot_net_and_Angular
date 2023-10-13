using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StockManagement.Entities;

public class StockDetailConfiguration : IEntityTypeConfiguration<StockDetail>
{
    public void Configure(EntityTypeBuilder<StockDetail> builder)
    {
        builder.HasOne(x => x.Stock)
               .WithMany(x => x.StockDetails)
               .IsRequired(false)
               .HasForeignKey(x => x.StockId);
    }
}
