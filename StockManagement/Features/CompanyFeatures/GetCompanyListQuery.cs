

namespace StockManagement.Features.CompanyFeatures;

public class GetCompanyListQuery : IRequest<List<CompaniesDTO>>
{
    internal sealed class GetCompanyListQueryHandler : IRequestHandler<GetCompanyListQuery, List<CompaniesDTO>>
    {
        private readonly UnitOfWork _unitOfWork;

        public GetCompanyListQueryHandler(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<CompaniesDTO>> Handle(GetCompanyListQuery request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.Company.Queryable
                                .Where(a => a.IsDeleted == 0)
                                .Select(query => new CompaniesDTO
                                {
                                    CompanyId = query.CompanyId,
                                    CompanyName = query.CompanyName,
                                    IsDeleted = query.IsDeleted,
                                    Picture = query.Picture
                                })
                                .ToListAsync();
        }
    }
}
