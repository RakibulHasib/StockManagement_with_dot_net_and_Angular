namespace StockManagement.DTO
{

    public class UserDTO
    {
        public string UserName { get; set; } = default!;
        public string Password { get; set; } = default!;
        public int RoleId { get; set; }=default!;
    }
}
