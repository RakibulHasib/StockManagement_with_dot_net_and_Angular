using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockManagement.Services;

namespace StockManagement.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController : ControllerBase
{

    private readonly IAuthenticateService _authenticateService;



    public AuthenticationController(IAuthenticateService authenticateService)
    {

        _authenticateService = authenticateService;

    }


    [HttpPost("signIn")]
    public async Task<ActionResult<ApiResponse>> SignIn([FromBody] UserDTO credentials)
    {
        return await _authenticateService.AuthenticateUser(credentials.UserName, credentials.Password);

        // Authentication failed
        //return Unauthorized();
    }

    //[HttpPost("logout")]
    //public  async Task<IActionResult> Logout()
    //{
    //    var userId = GetAuthenticatedUserId();

    //    if (userId.HasValue)
    //    {
    //        var user = await _userService.GetUserById(userId.Value); 

    //        if (user != null)
    //        {
    //            user. = null;
    //            _db.Users.Update(user);
    //            return Ok();
    //        }
    //        else
    //        {

    //            return BadRequest("Invalid user.");
    //        }
    //    }

    //    return Unauthorized();
    //}

    private ClaimResponseDTO? GetAuthenticatedUserId()
    {
        var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        return _authenticateService.ValidateToken(token);
    }

    [HttpGet("DecodeToken/{token}")]
    public  ClaimResponseDTO DecodeToken( string token)
    {
        return _authenticateService.DecodeToken(token);
    }


}




