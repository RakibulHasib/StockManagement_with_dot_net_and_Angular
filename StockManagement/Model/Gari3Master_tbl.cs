using System.ComponentModel.DataAnnotations;

namespace StockManagement.Model
{
    public class Gari3Master_tbl
    {
        [Key]
        public int Gari3MasterId { get; set; }
        public decimal TotalPrice { get; set; }
        public int TotalReceive { get; set; }
        public int TotalReturn { get; set; }
        public int TotalSales { get; set; }
        public decimal GrandTotal { get; set; }
        public virtual ICollection<Gari3> Gari3s { get; set; } = new HashSet<Gari3>();
    }
}
