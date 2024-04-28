using System;
using System.Collections.Generic;

namespace StockManagement.Entities
{
    public partial class SalesDistribute
    {
        public long SalesDistributeId { get; set; }
        public decimal TotalPrice { get; set; }
        public int TotalReceive { get; set; }
        public int TotalReturn { get; set; }
        public int TotalSales { get; set; }
        public decimal GrandTotal { get; set; }
        public int ConcernPersonId { get; set; }
        public DateTime CreationTime { get; set; }
        public int IsDeleted { get; set; }
        public int Status { get; set; }
        public int CompanyId { get; set; }
    }
}
