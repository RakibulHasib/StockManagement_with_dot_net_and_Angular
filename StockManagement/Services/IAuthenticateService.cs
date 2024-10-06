using StockManagement.Entities;
using StockManagement.Enum;

namespace StockManagement.Services;

public interface IAuthenticateService
{
    ClaimResponseDTO DecodeToken(string token);
    Task<ApiResponse> AuthenticateUser(string username, string password);
    ClaimResponseDTO? ValidateToken(string token);
    Task<bool> HasPermission(int roleId, RoleRights[] requiredPermissions);
}
