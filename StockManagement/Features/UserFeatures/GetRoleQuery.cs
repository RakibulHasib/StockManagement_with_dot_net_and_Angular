using StockManagement.Features.CompanyFeatures;

namespace StockManagement.Features.UserFeatures
{
    public class GetRoleQuery : IRequest<List<RoleMasterDTO>>
    {

        internal sealed class GetRoleQueryHandler : IRequestHandler<GetRoleQuery, List<RoleMasterDTO>>
        {
            private readonly UnitOfWork _unitOfWork;

            public GetRoleQueryHandler(UnitOfWork unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }

            public async Task<List<RoleMasterDTO>> Handle(GetRoleQuery request, CancellationToken cancellationToken)
            {
                return await _unitOfWork.RoleMaster.Queryable
                                   .Select(query => new RoleMasterDTO
                                   {
                                       RoleId = query.RoleId,
                                       RoleName = query.RoleName
                                   })
                                   .ToListAsync();

            }
        }
    }
}
