using System;
using System.Collections.Generic;

namespace StockManagement.Entities
{
    public partial class Company
    {
        public int CompanyId { get; set; }
        public string? CompanyName { get; set; }
        public string? Picture { get; set; }
        public int IsDeleted { get; set; }
    }
}
