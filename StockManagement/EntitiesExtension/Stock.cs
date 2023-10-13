namespace StockManagement.Entities;

public partial class Stock
{
    public virtual ICollection<StockDetail> StockDetails { get; set; }
}
