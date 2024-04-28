using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StockManagement.ContextConfiguration
{
    public class ConcernUserCompanyMappingConfiguration : IEntityTypeConfiguration<ConcernUserCompanyMapping>
    {
        public void Configure(EntityTypeBuilder<ConcernUserCompanyMapping> builder)
        {
            builder.HasOne(x => x.ConcernPerson)
                .WithMany(x => x.ConcernUserCompanyMapping)
                .IsRequired(false)
                .HasForeignKey(x => x.ConcernPersonId);

            builder.HasOne(x => x.Company)
                .WithMany(x => x.ConcernUserCompanyMappings)
                .IsRequired(false)
                .HasForeignKey(x => x.CompanyId);
        }
    }
}
