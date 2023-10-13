using System;
using System.Collections.Generic;

namespace StockManagement.Entities
{
    public partial class RoleMaster
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; } = null!;
    }
}
