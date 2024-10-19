namespace StockManagement.DTO
{
    public class DailyDistributeDataDTO
    {
        public long SalesDistributeId { get; set; }
        public string? ConcernPerson { get; set; }
        public string? CompanyName { get; set; }
        public int TotalReceive { get; set; }
        public int TotalReturn { get; set; }
        public int TotalSales { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal GrandTotal { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
