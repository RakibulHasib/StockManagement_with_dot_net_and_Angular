using System;
using System.Collections.Generic;

namespace StockManagement.Entities
{
    public partial class RoleAssagin
    {
        public int RoleAssaginId { get; set; }
        public int RoleId { get; set; }
        public int UserId { get; set; }
    }
}
