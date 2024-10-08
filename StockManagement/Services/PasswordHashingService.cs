namespace StockManagement.Services;

public class PasswordHashingService : IPasswordHashingService
{

    private const int SaltSize = 32;  
    private const int KeySize = 64;  
    private const int Iterations = 10000; 
    private readonly AppSettings _appSettings;

    public PasswordHashingService(IOptions<AppSettings> settings)
    {
        _appSettings = settings.Value;
    }

    public string HashPassword(string password)
    {
        using (var rng = RandomNumberGenerator.Create())
        {
            var saltBytes = new byte[SaltSize];
            rng.GetBytes(saltBytes);
            var salt = Convert.ToBase64String(saltBytes);

            var hashBytes = PBKDF2Hash(password, saltBytes);

            return $"{Convert.ToBase64String(hashBytes)}:{salt}";
        }
    }

    public bool Authenticate(string inputPassword, string storedPassword)
    {
        var storedHashAndSalt = storedPassword.Split(':');
        var storedHash = storedHashAndSalt[0];
        var storedSalt = Convert.FromBase64String(storedHashAndSalt[1]);

        var inputHashBytes = PBKDF2Hash(inputPassword, storedSalt);
        var inputHash = Convert.ToBase64String(inputHashBytes);

        return inputHash == storedHash;
    }

    private byte[] PBKDF2Hash(string password, byte[] salt)
    {
        using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA512))
        {
            return pbkdf2.GetBytes(KeySize); 
        }
    }
    //private readonly AppSettings _appSettings;
    //private readonly byte[] _keyBytes;

    //public PasswordHashingService(IOptions<AppSettings> settings)
    //{
    //    _appSettings = settings.Value;
    //    _keyBytes = Encoding.UTF8.GetBytes(_appSettings.key);
    //}


    //public string HashPassword(string password)
    //{
    //    using (var rng = RandomNumberGenerator.Create())
    //    {
    //        var saltBytes = new byte[16];
    //        rng.GetBytes(saltBytes);
    //        var salt = Convert.ToBase64String(saltBytes);

    //        using (var hmac = new HMACSHA512(_keyBytes))
    //        {
    //            var passwordBytes = Encoding.UTF8.GetBytes(password + salt);
    //            var hashBytes = hmac.ComputeHash(passwordBytes);
    //            return Convert.ToBase64String(hashBytes) + ":" + salt;
    //        }
    //    }
    //}

    //public bool Authenticate(string inputPassword, string storedPassword)
    //{
    //    var storedHashAndSalt = storedPassword.Split(':');
    //    var storedHash = storedHashAndSalt[0];
    //    var storedSalt = storedHashAndSalt[1];

    //    using (var hmac = new HMACSHA512(_keyBytes))
    //    {
    //        var inputPasswordBytes = Encoding.UTF8.GetBytes(inputPassword + storedSalt);
    //        var inputHashBytes = hmac.ComputeHash(inputPasswordBytes);
    //        var inputHash = Convert.ToBase64String(inputHashBytes);

    //        return inputHash == storedHash;
    //    }
    //}
}
