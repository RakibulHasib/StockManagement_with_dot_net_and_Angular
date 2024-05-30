﻿using StockManagement.Features.CompanyFeatures;

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
                    RoleAssagin roleAssagin = new RoleAssagin
                    {
                        RoleId = request.RoleId,
                        UserId = request.UserID

                    };
                    await _unitOfWork.RoleAssagin.AddAsync(roleAssagin);

                    await _unitOfWork.SaveChangesAsync();
                    return new ApiResponse<int>
                    {
                        Status = Status.Success,
                        StatusCode = (int)HttpStatusCode.OK,
                        Data = roleAssagin.RoleAssaginId
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