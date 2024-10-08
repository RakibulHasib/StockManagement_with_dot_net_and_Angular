namespace StockManagement.Services;

public interface IPasswordHashingService
{
    string HashPassword(string password);
    bool Authenticate(string inputPassword, string storedPassword);
}
