namespace StockManagement.Services;
public class UserService
{

    private readonly UnitOfWork _unitOfWork;
    private readonly IPasswordHashingService _passwordHashingService;
    private int ROLE_ID = 0;
    private string USER_STATUS = "Pending";

    public UserService(UnitOfWork unitOfWork, IPasswordHashingService passwordHashingService)
    {
        _unitOfWork = unitOfWork;
        _passwordHashingService = passwordHashingService;
    }

    public async Task<ApiResponse> UserRegister(User user)
    {
        try
        {
            bool IsExist = await IsUsernameExistsAsync(user.UserName);

            if (IsExist)
            {
                return new ApiResponse()
                {
                    Message = "User is alredy exits",
                    Status = Status.UserExist,
                    StatusCode = (int)HttpStatusCode.Conflict,
                };
            }

            string hashed_password = _passwordHashingService.HashPassword(user.Password.Trim());

            var user_data = new User()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName.ToLower(),
                Password = hashed_password,
                UserStatus = (int)UserStatus.Pending,
                Token = " ",
                RoleId = ROLE_ID,
                IsDeleted = 0
            };

            await _unitOfWork.Users.AddAsync(user_data);
            await _unitOfWork.SaveChangesAsync();

            return new ApiResponse<User>()
            {
                Message = " ",
                Status = Status.Success,
                StatusCode = (int)HttpStatusCode.OK,
                Data = user_data
            };

        }
        catch (Exception ex)
        {

            return new ApiResponse()
            {
                Message = ex.Message,
                Status = Status.Failed,
                StatusCode = (int)HttpStatusCode.InternalServerError
            };
        }
    }

    private async Task<bool> IsUsernameExistsAsync(string userName)
    {
        var usernameExists = await _unitOfWork.Users.Queryable.Where(x => x.UserName.ToLower() == userName.Trim().ToLower() && x.UserStatus == (int)UserStatus.Active).CountAsync();
        return usernameExists > 0;
    }

    public async Task<ApiResponse> UpdateUser(User user)
    {
        try
        {
            var user_data = await _unitOfWork.Users.Queryable.Where(u => u.UserId == user.UserId).FirstOrDefaultAsync();

            user_data.FirstName = user.FirstName;
            user_data.LastName = user.LastName;
            user_data.UserName = user.UserName;
            user_data.RoleId = user.RoleId;

            _unitOfWork.Users.Update(user_data);
            await _unitOfWork.SaveChangesAsync();

            return new ApiResponse<User>()
            {
                Message = " ",
                Status = Status.Success,
                StatusCode = (int)HttpStatusCode.OK,
                Data = user_data
            };

        }
        catch (Exception ex)
        {

            return new ApiResponse()
            {
                Message = ex.Message,
                Status = Status.Failed,
                StatusCode = (int)HttpStatusCode.InternalServerError
            };
        }
    }

    public async Task<ApiResponse> RoleEntry(RoleMaster roleMaster)
    {
        try
        {
            var role_master = new RoleMaster()
            {
                RoleId = ROLE_ID,
                RoleName = roleMaster.RoleName,
            };
            await _unitOfWork.RoleMaster.AddAsync(roleMaster);
            await _unitOfWork.SaveChangesAsync();
            return new ApiResponse<RoleMaster>()
            {

                Message = " ",
                Status = Status.Success,
                StatusCode = (int)HttpStatusCode.OK,
                Data = role_master
            };

        }
        catch (Exception ex)
        {
            return new ApiResponse()
            {
                Message = ex.Message,
                Status = Status.Failed,
                StatusCode = (int)HttpStatusCode.InternalServerError
            };
        }
    }




    public async Task<ApiResponse> GetUserById(int userId)
    {
        try
        {
            var user_data = await _unitOfWork.Users.Queryable.Where(u => u.UserId == userId).FirstOrDefaultAsync();
            return new ApiResponse<User>()
            {

                Message = " ",
                Status = Status.Success,
                StatusCode = (int)HttpStatusCode.OK,
                Data = user_data
            };
        }
        catch (Exception ex)
        {
            return new ApiResponse()
            {
                Message = ex.Message,
                Status = Status.Failed,
                StatusCode = (int)HttpStatusCode.InternalServerError
            };
        }
    }

    public async Task<ApiResponse> GetUnApprovedUserList()
    {
        try
        {
            var user_data = await _unitOfWork.Users.Queryable.Where(u => u.UserStatus == (int)UserStatus.Pending).ToListAsync();
            return new ApiResponse<List<User>>()
            {

                Message = " ",
                Status = Status.Success,
                StatusCode = (int)HttpStatusCode.OK,
                Data = user_data
            };
        }
        catch (Exception ex)
        {
            return new ApiResponse()
            {
                Message = ex.Message,
                Status = Status.Failed,
                StatusCode = (int)HttpStatusCode.InternalServerError
            };
        }
    }

    public async Task<ApiResponse> GetUserList()
    {
        try
        {
            var user_data = await _unitOfWork.Users.Queryable
               .Where(x => x.IsDeleted == 0)
               .Select(x => new UserInfoDTO
               {
                   UserId = x.UserId,
                   UserName = x.UserName,
                   UserStatus = x.UserStatus ?? 0,
                   FirstName = x.FirstName,
                   LastName = x.LastName,
                   RoleId = x.RoleId,
                   RoleName = x.RoleMaster.RoleName
               }).ToListAsync();

            return new ApiResponse<List<UserInfoDTO>>()
            {
                Message = " ",
                Status = Status.Success,
                StatusCode = (int)HttpStatusCode.OK,
                Data = user_data
            };
        }
        catch (Exception ex)
        {
            return new ApiResponse()
            {
                Message = ex.Message,
                Status = Status.Failed,
                StatusCode = (int)HttpStatusCode.InternalServerError
            };
        }
    }

    public async Task<ApiResponse> UserApproved(int userId)
    {
        try
        {

            var user_data = await _unitOfWork.Users.Queryable.Where(u => u.UserId == userId).FirstOrDefaultAsync();
            user_data.UserStatus = (int)UserStatus.Active;
            user_data.IsDeleted = 0;
            _unitOfWork.Users.Update(user_data);
            await _unitOfWork.SaveChangesAsync();

            return new ApiResponse<User>()
            {
                Message = " ",
                Status = Status.Success,
                StatusCode = (int)HttpStatusCode.OK,
                Data = user_data
            };

        }
        catch (Exception ex)
        {

            return new ApiResponse()
            {
                Message = ex.Message,
                Status = Status.Failed,
                StatusCode = (int)HttpStatusCode.InternalServerError
            };
        }
    }


    public async Task<ApiResponse> UserDelete(int userId)
    {
        try
        {
            var user_data = await _unitOfWork.Users.Queryable.Where(u => u.UserId == userId).FirstOrDefaultAsync();
            user_data.UserStatus = (int)UserStatus.Inactive;
            user_data.IsDeleted = 1;
            _unitOfWork.Users.Update(user_data);
            await _unitOfWork.SaveChangesAsync();

            return new ApiResponse<User>()
            {
                Message = " ",
                Status = Status.Success,
                StatusCode = (int)HttpStatusCode.OK,
                Data = user_data
            };

        }
        catch (Exception ex)
        {

            return new ApiResponse()
            {
                Message = ex.Message,
                Status = Status.Failed,
                StatusCode = (int)HttpStatusCode.InternalServerError
            };
        }
    }

    public async Task<ApiResponse> ResetPassword(int userId, string newPassword)
    {
        string password = newPassword.Trim();
        string hashed_password = _passwordHashingService.HashPassword(password);

        var user_data = await _unitOfWork.Users.Queryable.Where(u => u.UserId == userId && u.IsDeleted == 0).FirstOrDefaultAsync();
        if (user_data is null)
        {
            return new ApiResponse()
            {
                Message = "User not found",
                Status = Status.Failed,
                StatusCode = (int)HttpStatusCode.NotFound,
            };

        }

        user_data.Password = hashed_password;
        _unitOfWork.Users.Update(user_data);
        await _unitOfWork.SaveChangesAsync();
        return new ApiResponse()
        {
            Message = "User password is updated",
            Status = Status.Success,
            StatusCode = (int)HttpStatusCode.OK,
        };

    }

    public async Task<ApiResponse> UserRoleAssign(int userId, int roleId)
    {
        try
        {
            var user_data = await _unitOfWork.Users.Queryable.Where(u => u.UserId == userId).FirstOrDefaultAsync();

            user_data.RoleId = roleId;

            _unitOfWork.Users.Update(user_data);
            await _unitOfWork.SaveChangesAsync();

            return new ApiResponse()
            {
                Message = " ",
                Status = Status.Success,
                StatusCode = (int)HttpStatusCode.OK,
            };

        }
        catch (Exception ex)
        {

            return new ApiResponse()
            {
                Message = ex.Message,
                Status = Status.Failed,
                StatusCode = (int)HttpStatusCode.InternalServerError
            };
        }
    }

}
