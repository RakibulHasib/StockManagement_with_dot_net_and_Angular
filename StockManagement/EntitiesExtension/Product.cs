namespace StockManagement.Entities;

public partial class Product
{
    public virtual Company Company { get; set; }
    public virtual ICollection<StockDetail> StockDetails { get; set; }
}
