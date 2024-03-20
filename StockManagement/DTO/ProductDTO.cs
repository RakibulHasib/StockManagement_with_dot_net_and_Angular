namespace StockManagement.DTO;

public class ProductDTO
{
    public int ProductId { get; set; }
    public string? ProductName { get; set; }
    public string? Description { get; set; }
    public int CompanyId { get; set; }
    public int IsActive { get; set; }
    public decimal? Price { get; set; }
    public int? Sequence { get; set; }
    public int IsDeleted { get; set; }
}

public class GetProductData
{
    public int ProductId { get; set; }
    public string? ProductName { get; set; }
    public string? CompanyName { get; set; }
    public string? Description { get; set; }
    public int CompanyId { get; set; }
    public int IsActive { get; set; }
    public decimal? Price { get; set; }
    public int? Sequence { get; set; }
    public int IsDeleted { get; set; }
    public int? CurrentStock { get; set; }
    public int? PreviousStock { get; set; }
}
