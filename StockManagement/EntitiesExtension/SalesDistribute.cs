namespace StockManagement.Entities;

public partial class SalesDistribute
{
    public virtual ICollection<SalesDistributeDetail> SalesDistributeDetails { get; set; }
    public virtual Company Company { get; set; }
}
