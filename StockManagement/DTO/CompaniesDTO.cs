namespace StockManagement.DTO;

public class CompaniesDTO
{
    public int CompanyId { get; set; }
    public string? CompanyName { get; set; }
    public string? Picture { get; set; }
    public int IsDeleted { get; set; }
}
