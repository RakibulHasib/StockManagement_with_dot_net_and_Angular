using System;
using System.Collections.Generic;

namespace Entities
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

        public virtual Company Company { get; set; } = null!;
    }
}
