using StockManagement.Entities;

namespace StockManagement.Services;

public interface IAuthenticateService
{
    ClaimResponseDTO DecodeToken(string token);
    Task<ApiResponse> AuthenticateUser(string username, string password);
    ClaimResponseDTO? ValidateToken(string token);
}
