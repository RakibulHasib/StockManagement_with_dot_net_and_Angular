using System.ComponentModel.DataAnnotations;

namespace StockManagement.Model
{
    public class KaziFarmFoodMaster_tbl
    {
        [Key]
        public int KaziFarmFoodMasterId { get; set; }
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
        public virtual ICollection<KaziFarmFood> KaziFarmFoods { get; set; } = new HashSet<KaziFarmFood>();
    }
}
