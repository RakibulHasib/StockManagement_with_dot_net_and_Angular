namespace StockManagement.Entities;

public partial class ConcernPerson
{
    public virtual ICollection<ConcernUserCompanyMapping> ConcernUserCompanyMapping { get; set; }
}

