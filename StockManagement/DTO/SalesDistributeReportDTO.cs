namespace StockManagement.DTO
{
    public class SalesDistributeReportDTO
    {
        public long SalesDistributeId { get; set; }
        public string? ConcernPerson { get; set; }
        public DateTime CreationTime { get; set; }
        public List<SalesDistributeReportDetail>? reportDetails { get; set; }
    }

    public class SalesDistributeReportDetail
    {
        public Guid SalesDistributeDetailsId { get; set; }
        public long SalesDistributeId { get; set; }
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public decimal Price { get; set; }
        public int ReceiveQuantity { get; set; }
        public int ReturnQuantity { get; set; }
        public int SalesQuantity { get; set; }
        public decimal TotalSalesPrice { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
