using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockManagement.Entities;

namespace StockManagement.ContextConfiguration;

public class SalesDistributeDetailConfiguration : IEntityTypeConfiguration<SalesDistributeDetail>
{
    public void Configure(EntityTypeBuilder<SalesDistributeDetail> builder)
    {
        builder.HasOne(x => x.SalesDistribute)
                .WithMany(x => x.SalesDistributeDetails)
                .IsRequired(false)
                .HasForeignKey(x => x.SalesDistributeId);

    }
}
