using System.ComponentModel.DataAnnotations.Schema;

namespace StockManagement.Model
{
    public class Gari3
    {
        public int Gari3Id { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public decimal Price { get; set; }
        public int Receive { get; set; }
        public int Return { get; set; }
        public int Sales { get; set; }
        public decimal Total { get; set; }
        public virtual Product Product { get; set; }
    }
}
