using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StockManagement.Model
{
    public class Gari1Master_tbl
    {
        [Key]
        public int Gari1MasterId { get; set; }
        public decimal TotalPrice { get; set; }
        public int TotalReceive { get; set; }
        public int TotalReturn { get; set; }
        public int TotalSales { get; set; }
        public decimal GrandTotal { get; set; }
        public virtual ICollection<Gari1> Gari1s { get; set; } = new HashSet<Gari1>();
    }
}
