using System;
using System.Collections.Generic;

namespace StockManagement.Entities
{
    public partial class ConcernUserCompanyMapping
    {
        public int ConcernPersonId { get; set; }
        public int CompanyId { get; set; }
    }
}
