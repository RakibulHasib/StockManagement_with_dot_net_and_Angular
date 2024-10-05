using StockManagement.Enum;

namespace StockManagement.DTO;

public class ClaimResponseDTO
{
    public int RoleId { get; set; }
    public int UserId { get; set; }
    public List<RoleRights>? Permissions { get; set; }  
    //public string? permission { get; set; }
    //public string? sessionId { get; set; }
}
