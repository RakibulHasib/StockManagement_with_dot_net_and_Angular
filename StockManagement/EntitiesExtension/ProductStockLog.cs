namespace StockManagement.Entities;
public partial class ProductStockLog
{
    public virtual Product Product { get; set; }
    public virtual Product StockProduct { get; set; }
}

