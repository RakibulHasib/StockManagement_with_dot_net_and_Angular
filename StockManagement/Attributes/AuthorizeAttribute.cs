namespace StockManagement.Attributes;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
public class AuthorizeAttribute : Attribute, IAuthorizationFilter
{
   
    private readonly UnitOfWork _unitOfWork;
    public AuthorizeAttribute(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    public async void OnAuthorization(AuthorizationFilterContext context)
    {
        if (context == null)
        {
            throw new ArgumentNullException(nameof(context));
        }
        string? token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        if (token == null)
        {
            context.Result = new UnauthorizedResult();
            return;
        }
        AuthenticateService? auth_service = context.HttpContext.RequestServices.GetService(typeof(AuthenticateService)) as AuthenticateService;
        var response = auth_service?.ValidateToken(token);
        if (response is null)
        {
            context.Result = new UnauthorizedObjectResult(new { Message = "Token is Expired" });
            return;
        }
        int? userID = response?.UserId;

        if (userID == null)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

      

        int roleId = int.TryParse(context.HttpContext.User.FindAll(ClaimTypes.Role).Select(c => c.Value).FirstOrDefault(), out roleId) ? roleId : throw new FormatException("Role value is not an integer.");



        if (response?.RoleId != roleId)
        {
            context.Result = new ForbidResult();
            return;
        }

        Claim claim = new Claim(ClaimTypes.Name, userID.ToString() ?? "0");
        ClaimsIdentity? identity = new ClaimsIdentity(new[] { claim }, "BasicAuthentication");
        ClaimsPrincipal principal = new ClaimsPrincipal(identity);
        context.HttpContext.User = principal;
    }
}
