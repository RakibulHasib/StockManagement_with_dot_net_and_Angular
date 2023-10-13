using Contexts;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using StockManagement.DTO;
using StockManagement.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly StockDBContext _db;
        private readonly AppSettings _appSettings;


        public UserController(StockDBContext db, AppSettings appSettings)
        {
            _db = db;
            _appSettings = appSettings;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            user.RoleId = 1;
            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();
            return Ok();

        }

        [HttpPost("RoleAssing")]
        public async Task<IActionResult> RoleAssing([FromBody] RoleMaster RoleMaster)
        {
            await _db.RoleMasters.AddAsync(RoleMaster);
            await _db.SaveChangesAsync();
            return Ok();

        }

        //public User Authenticate(string username, string password)
        //{
        //    var user = _db.Users.SingleOrDefault(x => x.UserName == username && x.Password == password);
        //    //if User not found
        //    if (user == null)
        //    {
        //        return null;
        //    }
        //    //If User is found
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.ASCII.GetBytes(_appSettings.key);
        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
        //        {
        //            new Claim(ClaimTypes.Name,user.UserId.ToString()),
        //            new Claim(ClaimTypes.Role,"Admin"),
        //            new Claim(ClaimTypes.Version,"v3.1")
        //        }),
        //        Expires = DateTime.UtcNow.AddDays(2),
        //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        //    };
        //    var token = tokenHandler.CreateToken(tokenDescriptor);
        //    user.Token = tokenHandler.WriteToken(token);
        //    user.Password = "";
        //    return user;
        //}
        [HttpGet("GT")]
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


        [HttpGet("VT")]
        public int? ValidateToken(string token)
        {
            if (token == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.key)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };

            try
            {
                var claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out _);
                var userIdClaim = claimsPrincipal.FindFirst(ClaimTypes.Name);

                if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
                {
                    return userId;
                }
            }
            catch
            {
                // Ignore validation errors and return null
            }

            return null;
        }
        [HttpPost("signIn")]
        public IActionResult SignIn([FromBody] UserDTO credentials, [FromServices] IConfiguration configuration)
        {
            var user = AuthenticateUser(credentials.UserName, credentials.Password);

            if (user != null)
            {
                var token = GenerateToken(user, configuration["AppSettings:Key"]);
                user.Token = token;
                user.Password = "";
                return Ok(user);
            }

            // Authentication failed
            return Unauthorized();
        }
        [HttpGet("AU")]
        public User? AuthenticateUser(string userName, string password)
        {

            var user = _db.Users.FirstOrDefault(u => u.UserName == userName && u.Password == password);
            return user;
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




        //public async Task<bool> AuthenticateUser(User user)
        //{
        //    var userToLogin = await _db.Users.FirstOrDefaultAsync(x => x.UserName == user.UserName && x.Password==user.Password);

        //    if (userToLogin!=null)
        //    {
        //        return true;
        //    }
        //    else
        //    {
        //        return false;
        //    }
        //}
        [HttpGet("getByID")]
        public User? GetUserById(int userId)
        {
            return _db.Users.FirstOrDefault(u => u.UserId == userId);
        }


        [HttpPost("logout")]
        public IActionResult Logout()
        {
            var userId = GetAuthenticatedUserId();

            if (userId.HasValue)
            {
                var user = GetUserById(userId.Value);

                if (user != null)
                {
                    user.Token = null;
                    _db.Users.Update(user);
                    return Ok();
                }
                else
                {

                    return BadRequest("Invalid user.");
                }
            }

            return Unauthorized();
        }
        [HttpGet("GAUI")]

        private int? GetAuthenticatedUserId()
        {
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();


            return ValidateToken(token);
        }




    }
}
