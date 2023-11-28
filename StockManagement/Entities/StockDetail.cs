using System;
using System.Collections.Generic;

namespace StockManagement.Entities
{
    public partial class StockDetail
    {
        public Guid StockDetailsId { get; set; }
        public long StockId { get; set; }
        public int ProductId { get; set; }
        public int CompanyId { get; set; }
        public int? Eja { get; set; }
        public int? RestockQuantity { get; set; }
        public int? SalesQuantity { get; set; }
        public decimal Price { get; set; }
        public int? TotalQuantity { get; set; }
        public decimal? TotalAmount { get; set; }
        public DateTime CreationTime { get; set; }
        public int IsDeleted { get; set; }
        public int? DamageQuantity { get; set; }
    }
}
