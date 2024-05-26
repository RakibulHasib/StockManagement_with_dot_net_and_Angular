using StockManagement.Features.CompanyFeatures;

namespace StockManagement.Features.UserFeatures
{
    public class InsertRoleCommand : IRequest<ApiResponse>
    {
        public string RoleName { get; set; }

        internal sealed class InsertRoleCommandHandler : IRequestHandler<InsertRoleCommand, ApiResponse>
        {
            private readonly UnitOfWork _unitOfWork;

            public InsertRoleCommandHandler(UnitOfWork unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }

            public async Task<ApiResponse> Handle(InsertRoleCommand request, CancellationToken cancellationToken)
            {
                try
                {
                    RoleMaster roleMaster = new RoleMaster
                    {
                        RoleName = request.RoleName,
                        

                    };
                    await _unitOfWork.RoleMaster.AddAsync(roleMaster);

                    await _unitOfWork.SaveChangesAsync();
                    return new ApiResponse<int>
                    {
                        Status = Status.Success,
                        StatusCode = (int)HttpStatusCode.OK,
                        Data = roleMaster.RoleId
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
    public class RoleValidator : AbstractValidator<InsertRoleCommand>
    {
        public RoleValidator()
        {
            RuleFor(a => a.RoleName)
            .NotEmpty();
        }


    }
}
