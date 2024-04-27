using System;
using System.Collections.Generic;

namespace StockManagement.Entities
{
    public partial class ProductStockLog
    {
        public Guid Id { get; set; }
        public int ProductId { get; set; }
        public int NewQuantity { get; set; }
        public int PreviousQuantity { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
