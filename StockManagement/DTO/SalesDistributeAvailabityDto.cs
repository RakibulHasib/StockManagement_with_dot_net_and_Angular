namespace StockManagement.DTO
{
    public class SalesDistributeAvailabityDto
    {
        public LastSalesDistributeInfoDto? LastDistribute { get; set; }
        public DateTime Today { get; set; }
    }

    public class LastSalesDistributeInfoDto
    {
        public int LastDistributeStatus { get; set; }
        public DateTime LastDistributeDay { get; set; }
    }
}
