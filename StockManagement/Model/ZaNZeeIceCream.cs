﻿using System.ComponentModel.DataAnnotations.Schema;

namespace StockManagement.Model
{
    public class ZaNZeeIceCream
    {
        public int ZaNZeeIceCreamId { get; set; }
        public int ProductId { get; set; }
        public int CompanyId { get; set; }
        [ForeignKey("SavoyIceCreamMaster_Tbl")]
        public int ZaNZeeIceCreamMasterId { get; set; }
        public int? Eja { get; set; }
        public decimal Price { get; set; }
        public int? NewProduct { get; set; }
        public int? Total { get; set; }
        public int? SalesQuantity { get; set; }
        public decimal? TotalAmount { get; set; }
        public int? Dumping { get; set; }
        public int? Receive { get; set; }
        public int? Remaining { get; set; }
        public DateTime CreatedDate { get; set; }

        public virtual Product? Product { get; set; }
        public virtual Company? Company { get; set; }
        public virtual SavoyIceCreamMaster_tbl? SavoyIceCreamMaster_Tbl { get; set; }
    }
}
