namespace StockManagement.DTO
{
    public class DailyDistributorStatusDTO
    {
        public int ConcernPersonId { get; set; }
        public string? ConcernPersonName { get; set; }
        public List<DistributorStatusDetail>? StatusDetail { get; set; }
    }

    public class DistributorStatusDetail
    {
        public string? CompanyName { get; set; }
        public int? Status { get; set; }
    }
}
