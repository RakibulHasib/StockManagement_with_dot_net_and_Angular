using System.ComponentModel.DataAnnotations.Schema;

namespace StockManagement.Model
{
    public class Gari1
    {
        public int Gari1Id { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        [ForeignKey("Gari1Master_tbl")]
        public int Gari1MasterId { get; set; }
        public decimal Price { get; set; }
        public int Receive { get; set; }
        public int Return { get; set; }
        public int Sales { get; set; }
        public decimal Total { get; set; }
        public virtual Product? Product { get; set; }
        public virtual Gari1Master_tbl? Gari1Master_tbl { get; set; }
    }
}
