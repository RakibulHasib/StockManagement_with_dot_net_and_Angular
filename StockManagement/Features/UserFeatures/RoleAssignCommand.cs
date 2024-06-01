using StockManagement.Entities;
using StockManagement.Features.CompanyFeatures;

namespace StockManagement.Features.UserFeatures
{
    public class RoleAssignCommand : IRequest<ApiResponse>
    {
        public int RoleId { get; set; }
        public int UserID { get; set; }

        internal sealed class RoleAssignCommandHandler : IRequestHandler<RoleAssignCommand, ApiResponse>
        {
            private readonly UnitOfWork _unitOfWork;

            public RoleAssignCommandHandler(UnitOfWork unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }

            public async Task<ApiResponse> Handle(RoleAssignCommand request, CancellationToken cancellationToken)
            {

                try
                {
                    var user_data = await _unitOfWork.Users.FindAsync(request.UserID);
                    if (user_data == null) 
                    {
                        return new ApiResponse()
                        {
                            Message = "User not Found",
                            Status = Status.Failed,
                            StatusCode = (int)HttpStatusCode.NotFound
                        };
                    }
                    user_data.RoleId = request.RoleId;

                    _unitOfWork.Users.Update(user_data);

                    var role_assign = await _unitOfWork.RoleAssagin.FindAsync(request.UserID);

                    if(role_assign != null)
                    {
                        role_assign.RoleId = request.RoleId;
                         _unitOfWork.RoleAssagin.Update(role_assign);
                    }
                    else
                    {
                        RoleAssagin roleAssagin = new RoleAssagin
                        {
                            RoleId = request.RoleId,
                            UserId = request.UserID

                        };
                        await _unitOfWork.RoleAssagin.AddAsync(roleAssagin);

                    }

                    await _unitOfWork.SaveChangesAsync();
                    return new ApiResponse
                    {
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
    }

    public class RoleAssignValidator : AbstractValidator<RoleAssignCommand>
    {
        public RoleAssignValidator()
        {
            RuleFor(a => a.UserID)
            .NotEmpty();

            RuleFor(a => a.RoleId)
           .NotEmpty();
        }


    }
}
