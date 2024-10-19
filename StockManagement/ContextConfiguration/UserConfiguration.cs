using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StockManagement.ContextConfiguration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasOne(x => x.RoleMaster)
           .WithMany(x => x.Users)
           .IsRequired(false)
           .HasForeignKey(x => x.RoleId);
        }
    }
}
