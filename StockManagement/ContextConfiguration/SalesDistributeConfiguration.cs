using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StockManagement.ContextConfiguration
{
    public class SalesDistributeConfiguration : IEntityTypeConfiguration<SalesDistribute>
    {
        public void Configure(EntityTypeBuilder<SalesDistribute> builder)
        {
            builder.HasOne(x => x.Company)
                .WithMany(x => x.SalesDistributes)
                .IsRequired(false)
                .HasForeignKey(x => x.CompanyId);
        }
    }
}
