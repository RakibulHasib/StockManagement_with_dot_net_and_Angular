namespace StockManagement.Services;

public class PasswordHashingService
{
    public  string HashPassword(string password)
    {

        byte[] salt = RandomNumberGenerator.GetBytes(16);


        string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA512,
            iterationCount: 100000,
            numBytesRequested: 32
        ));


        return Convert.ToBase64String(salt) + ":" + hashedPassword;
    }


    public  bool VerifyHashedPassword(string hashedPassword, string providedPassword)
    {

        string[] parts = hashedPassword.Split(':');
        if (parts.Length != 2)
        {
            return false;
        }

        byte[] salt = Convert.FromBase64String(parts[0]);

        string newHashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: providedPassword,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA512,
            iterationCount: 100000,
            numBytesRequested: 32
        ));

        return newHashedPassword == parts[1];
    }
}
