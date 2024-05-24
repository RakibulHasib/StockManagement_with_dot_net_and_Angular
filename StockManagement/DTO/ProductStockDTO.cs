namespace StockManagement.DTO
{
    public class ProductStockDTO
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public decimal? Price { get; set; }
        public int? CurrentStock { get; set; }
        public int? PreviousStock { get; set; }
    }
}
