namespace StockManagement.DTO
{
    public class CompanySalesPriceWeeklyDTO
    {
        public int CompanyID { get; set; }
        public string? CompanyName { get; set; }
        public int SalesQuantity { get; set; }
        public decimal SalesPrice { get; set; }
    }
}
