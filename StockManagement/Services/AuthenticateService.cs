using Microsoft.EntityFrameworkCore;
using StockManagement.DTO;
using StockManagement.Model;

namespace StockManagement.Services;

public class AuthenticateService : IAuthenticateService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly PasswordHashingService _hasher;
    private string _key;

    public AuthenticateService(UnitOfWork unitOfWork, IConfiguration configuration, PasswordHashingService hasher)
    {
        _unitOfWork = unitOfWork;
        _key = configuration["AppSettings:Key"];
        _hasher = hasher;
    }


    public async Task<ApiResponse> AuthenticateUser(string userName, string password)
    {
        //var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
        var user = await _unitOfWork.Users.Queryable.Where(u => u.UserName == userName && u.IsDeleted == 0).FirstOrDefaultAsync();
        if (user == null)
        {
            return new ApiResponse
            {
                Status = Status.UserNameNotFound,
                Message = "User not found",
                StatusCode = (int)HttpStatusCode.Unauthorized,
            };
        }
        if (user != null && user.UserStatus == (int)UserStatus.Pending && user.IsDeleted == 0)
        {
            return new ApiResponse
            {
                Status = Status.Unapproved,
                Message = "user not approved",
                StatusCode = (int)HttpStatusCode.Forbidden
            };

        }

        if (!BCrypt.Net.BCrypt.Verify(password, user.Password))  //(!_hasher.VerifyHashedPassword(user.Password,password))//SHA512
        {
            return new ApiResponse()
            {
                Message = "User password is invalid",
                Status = Status.WrongPassword,
                StatusCode = (int)HttpStatusCode.Unauthorized

            };
        }
        else if (user != null && user.UserStatus == (int)UserStatus.Active && user.UserName == userName)
        {
            var token = GenerateToken(user, _key);
            var user_credintial = new SignInResponseDTO()
            {
                UserId = user.UserId,
                UserName = userName,
                Token = token,
                RoleId = user.RoleId,

            };

            return new ApiResponse<SignInResponseDTO>
            {
                Status = Status.Authorized,
                Message = "",
                StatusCode = (int)HttpStatusCode.OK,
                Data = user_credintial

            };

        }
        else if (user != null && user.UserStatus == (int)UserStatus.Active && user.UserName != userName)
        {
            return new ApiResponse()
            {
                Message = "User Name is not matched",
                Status = Status.UserNameNotFound,
                StatusCode = (int)HttpStatusCode.Unauthorized

            };

        }
        else
        {
            return new ApiResponse
            {
                Status = Status.Unauthorized,
                Message = "user is unauthorized",
                StatusCode = (int)HttpStatusCode.Unauthorized,
            };
        }
        //int RoleId = _db.Users.Where(a=>a.UserName == userName).Select(a=>a.RoleId).FirstOrDefault();
        //if (RoleId != 0)
        //{
        //    var user = _db.Users.FirstOrDefault(u => u.UserName == userName && u.Password == password);
        //    return user;
        //}
        //else
        //{
        //    return null;
        //}
    }

    private string GenerateToken(User user, string secret)
    {
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
            new Claim(ClaimTypes.Name, user.UserId.ToString()),
            new Claim(ClaimTypes.Role, user.RoleId.ToString())
        }),
            Expires = DateTime.UtcNow.AddHours(24),
            SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }



    public ClaimResponseDTO? ValidateToken(string token)
    {

        if (token == null)
        {
            return null;
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_key)),
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = TimeSpan.Zero,
            ValidateLifetime = false
        };

        try
        {
            var claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out _);
            var userIdClaim = claimsPrincipal.FindFirst(ClaimTypes.Name);
            var rolIdClaim = claimsPrincipal.FindFirst(ClaimTypes.Role);

            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId) && rolIdClaim != null && int.TryParse(rolIdClaim.Value, out int roleId))
            {
                var ClaimResponse = new ClaimResponseDTO
                {
                    UserId = userId,
                    RoleId = roleId,
                };
                return ClaimResponse;
            }


        }
        catch
        {
            return null;
        }

        return null;
        //if (token == null)
        //{
        //    return null;
        //}

        //var tokenHandler = new JwtSecurityTokenHandler();
        //var validationParameters = new TokenValidationParameters
        //{
        //    ValidateIssuerSigningKey = true,
        //    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_key)),
        //    ValidateIssuer = false,
        //    ValidateAudience = false,
        //    ClockSkew = TimeSpan.Zero
        //};

        //try
        //{
        //    var claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out _);
        //    var userIdClaim = claimsPrincipal.FindFirst(ClaimTypes.Name);

        //    if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
        //    {
        //        return userId;
        //    }
        //}
        //catch
        //{
        //    // Ignore validation errors and return null
        //}

        //return null;
    }


    public ClaimResponseDTO TokenReader(string token)
    {
        if (token == null)
        {
            return null;
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_key)),
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = TimeSpan.Zero,
            ValidateLifetime = false
        };

        try
        {
            var claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out _);
            var userIdClaim = claimsPrincipal.FindFirst(ClaimTypes.Name);
            var rolIdClaim = claimsPrincipal.FindFirst(ClaimTypes.Role);
            var permissionClaim = claimsPrincipal.FindFirst(ClaimTypes.Dns);
            var sessionIdClaim = claimsPrincipal.FindFirst(ClaimTypes.Dsa);

            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId) && rolIdClaim != null && int.TryParse(rolIdClaim.Value, out int roleId))
            {
                var ClaimResponse = new ClaimResponseDTO
                {
                    UserId = userId,
                    RoleId = roleId,
 
                };
                return ClaimResponse;
            }
        }
        catch
        {
            return null;
        }

        return null;
    }
}
