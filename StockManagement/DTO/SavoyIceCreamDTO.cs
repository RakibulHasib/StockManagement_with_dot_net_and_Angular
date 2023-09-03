namespace StockManagement.DTO
{
    public class SavoyIceCreamDTO
    {
        public int SavoyIceCreamId { get; set; }
        public int MyProperty { get; set; }
        public int ProductId { get; set; }
        public int CompanyId { get; set; }
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
    }
    public class DailyDataDTO
    {
        public DateTime CreatedDate { get; set; }
        public int TotalSalesQuantity { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
