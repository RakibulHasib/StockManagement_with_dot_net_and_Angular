namespace StockManagement.DTO;

public class SignInResponseDTO
{
    public int UserId { get; set; }
    public string UserName { get; set; } = null!;
    public string? Token { get; set; }
    public int RoleId { get; set; }
}
