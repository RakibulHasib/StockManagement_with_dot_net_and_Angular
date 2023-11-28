namespace StockManagement.DTO
{
    public class StockDTO
    {
        public int ProductId { get; set; }
        public int? Eja { get; set; }
        public decimal Price { get; set; }
        public int? NewProduct { get; set; }
        public int? Total { get; set; }
        public int? SalesQuantity { get; set; }
        public decimal? TotalAmount { get; set; }
        public int? Dumping { get; set; }
        public int? Receive { get; set; }
        public int? Remaining { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? DamageQuantity { get; set; }
    }
    public class DailyDataDTO
    {
        public long StockId { get; set; }
        public DateTime CreationTime { get; set; }
        public int TotalSalesQuantity { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
