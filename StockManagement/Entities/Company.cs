using System;
using System.Collections.Generic;

namespace Entities
{
    public partial class Company
    {
        public Company()
        {
            Products = new HashSet<Product>();
        }

        public int CompanyId { get; set; }
        public string? CompanyName { get; set; }
        public string? Picture { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
