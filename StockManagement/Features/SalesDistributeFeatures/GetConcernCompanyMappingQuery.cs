
using StockManagement.Entities;

namespace StockManagement.Features.SalesDistributeFeatures;
public class GetConcernCompanyMappingQuery : IRequest<List<ConcernCompanyMappingDTO>>
{
    internal sealed class GetConcernCompanyMappingQueryHandler : IRequestHandler<GetConcernCompanyMappingQuery, List<ConcernCompanyMappingDTO>>
    {
        private readonly UnitOfWork _unitOfWork;

        public GetConcernCompanyMappingQueryHandler(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<ConcernCompanyMappingDTO>> Handle(GetConcernCompanyMappingQuery request, CancellationToken cancellationToken)
        {
            // method or fluent query

            var data = _unitOfWork.ConcernPerson.Queryable
                .Where(a => a.IsDeleted == 0)
                .Select(x => new ConcernCompanyMappingDTO
                {
                    ConcernPersonName = x.ConcernPersonName,
                    Companies = x.ConcernUserCompanyMapping.Select(s => new CompanyDTO
                    {
                        CompanyName = s.Company.CompanyName
                    }).ToList()
                }).ToList();

            return data;
        }
    }
}

public sealed class ConcernCompanyMappingDTO
{
    public string? ConcernPersonName { get; set; }
    public List<CompanyDTO>? Companies { get; set; }
}

public sealed class CompanyDTO
{
    public string? CompanyName { get; set; }
}
