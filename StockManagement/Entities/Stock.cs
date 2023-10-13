using System;
using System.Collections.Generic;

namespace StockManagement.Entities
{
    public partial class Stock
    {
        public long StockId { get; set; }
        public int CompanyId { get; set; }
        public int TotalEja { get; set; }
        public decimal TotalPrice { get; set; }
        public int TotalNewProduct { get; set; }
        public int GrandTotal { get; set; }
        public int TotalSalesQuantity { get; set; }
        public decimal GrandTotalAmount { get; set; }
        public int TotalDumping { get; set; }
        public int TotalReceive { get; set; }
        public int TotalRemaining { get; set; }
        public DateTime CreationTime { get; set; }
        public int IsDeleted { get; set; }
    }
}
