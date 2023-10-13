namespace StockManagement.Entities;

public partial class StockDetail
{
    public virtual Stock Stock { get; set; }
    public virtual Product Product { get; set; }
}
