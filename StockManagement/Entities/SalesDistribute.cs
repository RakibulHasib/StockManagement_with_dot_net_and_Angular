using System;
using System.Collections.Generic;

namespace Entities
{
    public partial class SalesDistribute
    {
        public long SalesDistributeId { get; set; }
        public decimal TotalPrice { get; set; }
        public int TotalReceive { get; set; }
        public int TotalReturn { get; set; }
        public int TotalSales { get; set; }
        public decimal GrandTotal { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? ConcernPerson { get; set; }
        public int IsDeleted { get; set; }
    }
}
