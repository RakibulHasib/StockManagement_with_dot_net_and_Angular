using System;
using System.Collections.Generic;

namespace StockManagement.Entities
{
    public partial class Product
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? Description { get; set; }
        public int CompanyId { get; set; }
        public int IsActive { get; set; }
        public decimal? Price { get; set; }
        public int? Sequence { get; set; }
        public int IsDeleted { get; set; }
        public int StockQuantity { get; set; }
        public int NewQuantity { get; set; }
        public Guid? LastStockLogId { get; set; }
    }
}
