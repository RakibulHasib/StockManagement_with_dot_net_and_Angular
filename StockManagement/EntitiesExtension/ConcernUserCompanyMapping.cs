namespace StockManagement.Entities;

public partial class ConcernUserCompanyMapping
{
    public virtual Company Company { get; set; }
    public virtual ConcernPerson ConcernPerson { get; set; }
}

