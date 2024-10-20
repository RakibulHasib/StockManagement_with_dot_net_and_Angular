namespace StockManagement.DTO
{
    public class ReportDTO
    {
        public long StockId { get; set; }
        public DateTime CreationTime { get; set; }
        public string? CompanyName { get; set; }
        public int CompanyID { get; set; }
        public decimal? TotalPrice { get; set; }
        public decimal? DamageAmount { get; set; }
        public decimal? AfterDamagePrice { get; set; }
        public decimal? Srcommission { get; set; }
        public decimal? AfterSrCommission { get; set; }
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
        public decimal Price { get; set; }
        public int? TotalQuantity { get; set; }
        public decimal? TotalPrice { get; set; }
        public int? SalesQuantity { get; set; }
        public int? ReturnQuantity { get; set; }
        public decimal? ReturnPrice { get; set; }
        public int? DamageQuantity { get; set; }
        public decimal? TotalAmount { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
