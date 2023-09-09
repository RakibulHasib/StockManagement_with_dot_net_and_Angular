namespace StockManagement.DTO
{
    public class CommonDTO
    {
    }

    public class RoleMasterDTO
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; } = default!;
    }

    public class RoleAssainDTO
    {
        public int RoleAssaginId { get; set; }
        public int RoleId { get; set; }
        public int UserId { get; set; }
    }
    public class UserRegisterDTO
    {
        public int UserId { get; set; }
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string UserName { get; set; } = default!;
        public string Password { get; set; } = default!;
        public string? Token { get; set; }
        public int RoleId { get; set; }


    }
}
