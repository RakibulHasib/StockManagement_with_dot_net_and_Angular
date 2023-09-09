using StockManagement.Model;

namespace StockManagement.Services
{
    public interface IAuthenticateService
    {
        User Authenticate(string username, string password);
    }
}
