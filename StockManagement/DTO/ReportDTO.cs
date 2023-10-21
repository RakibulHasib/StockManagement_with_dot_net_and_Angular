namespace StockManagement.DTO
{
    public class ReportDTO
    {
        public long StockId { get; set; }
        public DateTime CreationTime { get; set; }
        public string? CompanyName { get; set; }
        public List<ReportDetail>? reportDetails { get; set; }
    }
    public class ReportDetail
    {
        public Guid StockDetailsId { get; set; }
        public long StockId { get; set; }
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public int CompanyId { get; set; }
        public int? Eja { get; set; }
        public int? RestockQuantity { get; set; }
        public int? SalesQuantity { get; set; }
        public decimal Price { get; set; }
        public int? TotalQuantity { get; set; }
        public decimal? TotalAmount { get; set; }
        public int? Dumping { get; set; }
        public int? Receive { get; set; }
        public int? Remaining { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
