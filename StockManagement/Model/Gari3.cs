using System.ComponentModel.DataAnnotations.Schema;

namespace StockManagement.Model
{
    public class Gari3
    {
        public int Gari3Id { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        [ForeignKey("Gari3Master_tbl")]
        public int Gari3MasterId { get; set; }
        public decimal Price { get; set; }
        public int Receive { get; set; }
        public int Return { get; set; }
        public int Sales { get; set; }
        public decimal Total { get; set; }
        public virtual Product? Product { get; set; }
        public virtual Gari3Master_tbl? Gari3Master_tbl { get; set; }
    }
}
