
using StockManagement.Enum;
namespace StockManagement.Attributes;
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
public class JwtAuthorizeAttribute : Attribute, IAuthorizationFilter
{
    public RoleRights[] requiredPermissions { get; set; }

    public JwtAuthorizeAttribute(params RoleRights[] _requiredPermissions)
    {
        requiredPermissions = _requiredPermissions ?? new RoleRights[] { };
    }

    public async void OnAuthorization(AuthorizationFilterContext context)
    {
        if (context == null)
        {
            throw new ArgumentNullException(nameof(context));
        }

        string? token = GetTokenFromHeader(context);
        if (string.IsNullOrEmpty(token))
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var authService = context.HttpContext.RequestServices.GetService(typeof(IAuthenticateService)) as IAuthenticateService;
        if (authService == null)
        {
            context.Result = new StatusCodeResult(500);
            return;
        }

        var claimResponse = authService.ValidateToken(token);
        if (claimResponse == null)
        {
            context.Result = new UnauthorizedObjectResult(new { Message = "Invalid or Expired Token" });
            return;
        }


        int userId = claimResponse.UserId;
        int roleId = claimResponse.RoleId;

        if (!requiredPermissions.Any())
        {
            context.HttpContext.User = CreatePrincipal(userId);
            return;
        }

        var hasPermission = await authService.HasPermission(roleId, requiredPermissions);

        if (!hasPermission)
        {
            context.Result = new ForbidResult();
            return;
        }

        context.HttpContext.User = CreatePrincipal(userId);
    }

    private ClaimsPrincipal CreatePrincipal(int userId)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, userId.ToString())
        };

        var identity = new ClaimsIdentity(claims, "Bearer");
        return new ClaimsPrincipal(identity);
    }

    //private void SetHttpContextUser(ClaimResponseDTO validatedUser, AuthorizationFilterContext context)
    //{
    //    var claims = new List<Claim>
    //    {
    //        new Claim(ClaimTypes.Name, validatedUser.UserId.ToString()),
    //        new Claim(ClaimTypes.Role, validatedUser.RoleId.ToString())
    //    };

    //    var identity = new ClaimsIdentity(claims, "Bearer");
    //    var principal = new ClaimsPrincipal(identity);
    //    context.HttpContext.User = principal;
    //}

    private string? GetTokenFromHeader(AuthorizationFilterContext context)
    {
        string? authorizationHeader = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault();
        return authorizationHeader?.StartsWith("Bearer ") == true ? authorizationHeader.Substring("Bearer ".Length).Trim() : null;
    }
}



