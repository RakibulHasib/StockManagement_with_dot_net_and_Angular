using System;
using System.Collections.Generic;

namespace StockManagement.Entities
{
    public partial class ConcernUserCompanyMapping
    {
        public int Id { get; set; }
        public int ConcernPersonId { get; set; }
        public int CompanyId { get; set; }
    }
}
