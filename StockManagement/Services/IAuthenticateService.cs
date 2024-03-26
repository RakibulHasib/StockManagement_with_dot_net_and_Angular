using StockManagement.Entities;

namespace StockManagement.Services;

public interface IAuthenticateService
{
    Task<ApiResponse> AuthenticateUser(string username, string password);
    ClaimResponseDTO? ValidateToken(string token);
}
