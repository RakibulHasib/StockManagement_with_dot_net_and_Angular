namespace StockManagement.Entities;

public partial class Company
{
    public virtual ICollection<Product> Products { get; set; }
}
