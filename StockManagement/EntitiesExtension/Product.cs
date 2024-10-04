namespace StockManagement.Entities;

public partial class Product
{
    public virtual Company Company { get; set; }
    public virtual ICollection<StockDetail> StockDetails { get; set; }
    public virtual ICollection<ProductStockLog> ProductStockLogs { get; set; }
    public virtual ProductStockLog LastStockLog { get; set; }
}
