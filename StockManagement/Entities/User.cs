﻿using StockManagement.Enum;
using System;
using System.Collections.Generic;

namespace StockManagement.Entities
{
    public partial class User
    {
        public int UserId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? Token { get; set; }
        public int RoleId { get; set; }
        public int IsDeleted { get; set; }
        public UserStatus? UserStatus { get; set; }
    }
}
