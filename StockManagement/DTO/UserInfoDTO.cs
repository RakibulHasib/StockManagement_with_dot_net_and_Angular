namespace StockManagement.DTO
{
    public class UserInfoDTO
    {
        public int UserId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string RoleName { get; set; } = null!;
        public int RoleId { get; set; }
        public int UserStatus { get; set; }

    }
}
