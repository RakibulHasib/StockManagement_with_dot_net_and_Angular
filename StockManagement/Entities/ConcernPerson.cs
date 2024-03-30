using System;
using System.Collections.Generic;

namespace StockManagement.Entities
{
    public partial class ConcernPerson
    {
        public int ConcernPersonId { get; set; }
        public string ConcernPersonName { get; set; } = null!;
        public int IsDeleted { get; set; }
    }
}
