using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockManagement.Entities;

namespace StockManagement.ContextConfiguration
{
    public class StockConfiguration : IEntityTypeConfiguration<Stock>
    {
        public void Configure(EntityTypeBuilder<Stock> builder)
        {
            builder.HasOne(x => x.Company)
           .WithMany(x => x.Stocks)
           .IsRequired(false)
           .HasForeignKey(x => x.CompanyId);
        }
    }
}
