using Microsoft.EntityFrameworkCore;

namespace StockManagement.Contexts;

public partial class StockDBContext : DbContext
{
    partial void OnModelCreatingPartial(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(typeof(StockDBContext).Assembly);
    }
}
