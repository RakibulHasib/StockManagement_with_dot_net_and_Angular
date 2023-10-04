using System.ComponentModel.DataAnnotations;

namespace StockManagement.Model
{
    public class Gari2Master_tbl
    {
        [Key]
        public int Gari2MasterId { get; set; }
        public decimal TotalPrice { get; set; }
        public int TotalReceive { get; set; }
        public int TotalReturn { get; set; }
        public int TotalSales { get; set; }
        public decimal GrandTotal { get; set; }
        public virtual ICollection<Gari2> Gari2s { get; set; } = new HashSet<Gari2>();
    }
}
