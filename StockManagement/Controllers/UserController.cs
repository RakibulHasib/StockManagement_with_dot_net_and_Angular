using StockManagement.Features.CompanyFeatures;
using StockManagement.Features.UserFeatures;
using StockManagement.Services;

namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController<UserController>
    {

        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;

        }

        [HttpPost("register")]
        public async Task<ActionResult<ApiResponse>> Register([FromBody] User user)
        {
            return await _userService.UserRegister(user);
        }
        [HttpPut("update-user")]
        public async Task<ActionResult<ApiResponse>> UpdateUser([FromBody] User user)
        {
            return await _userService.UpdateUser(user);
        }

        [HttpPut("user-role-assign/{userId}")]
        public async Task<ActionResult<ApiResponse>> UserRoleAssign(int userId, int roleId)
        {
            return await _userService.UserRoleAssign(userId, roleId);
        }

        [HttpPut("approval/{userId}")]
        public async Task<ActionResult<ApiResponse>> Approval([FromRoute] int userId)
        {
            return await _userService.UserApproved(userId);
        }
        [HttpPut("delete/{userId}")]
        public async Task<ActionResult<ApiResponse>> UserDelete([FromRoute] int userId)
        {
            return await _userService.UserDelete(userId);
        }

        [HttpPut("password-reset")]
        public async Task<ActionResult<ApiResponse>> PasswordReset(int userId, string newPassword)
        {
            return await _userService.ResetPassword(userId, newPassword);
        }

        [HttpPost("role-insert")]
        public async Task<ActionResult<ApiResponse>> RoleInsert([FromBody] RoleMaster roleMaster)
        {

            return await _userService.RoleEntry(roleMaster);

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


        [HttpGet("get-by-userId")]
        public async Task<ApiResponse> GetUserById(int userId)
        {
            return await _userService.GetUserById(userId);
        }

        [HttpGet("get-unapproved-user-list")]
        public async Task<ApiResponse> GetUnapprovedUsers()
        {
            return await _userService.GetUnApprovedUserList();
        }


        [HttpGet("get-user-list")]
        public async Task<ApiResponse> GetUserList()
        {
            return await _userService.GetUserList();
        }

        [HttpPost("insert-role")]
        public async Task<ActionResult<ApiResponse>> InserRole(InsertRoleCommand command)
        {
            return await _mediator.Send(command);
        }


        [HttpPost("assign-role")]
        public async Task<ActionResult<ApiResponse>> AssignRole(RoleAssignCommand command)
        {
            return await _mediator.Send(command);
        }

        [HttpGet("role-list")]
        public async Task<ActionResult<IEnumerable<RoleMasterDTO>>> GetRoleList()
        {
            return await _mediator.Send(new GetRoleQuery());
        }

    }
}
