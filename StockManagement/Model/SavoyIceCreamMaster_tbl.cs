using System.ComponentModel.DataAnnotations;

namespace StockManagement.Model
{
    public class SavoyIceCreamMaster_tbl
    {
        [Key]
        public int SavoyIceCreamMasterId { get; set; }
        public int? TotalEja { get; set; }
        public decimal TotalPrice { get; set; }
        public int? TotalNewProduct { get; set; }
        public int? GrandTotal { get; set; }
        public int? TotalSalesQuantity { get; set; }
        public decimal? GrandTotalAmount { get; set; }
        public int? TotalDumping { get; set; }
        public int? TotalReceive { get; set; }
        public int? TotalRemaining { get; set; }
        public DateTime CreatedDate { get; set; }
        public virtual ICollection<SavoyIceCream> SavoyIceCreams { get; set; } = new HashSet<SavoyIceCream>();
    }
}
