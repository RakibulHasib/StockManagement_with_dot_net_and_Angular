
using StockManagement.Entities;

namespace StockManagement.Features.SalesDistributeFeatures;
public class GetConcernCompanyMappingQuery : IRequest<List<ConcernCompanyMappingDto>>
{
    internal sealed class GetConcernCompanyMappingQueryHandler : IRequestHandler<GetConcernCompanyMappingQuery, List<ConcernCompanyMappingDto>>
    {
        private readonly UnitOfWork _unitOfWork;

        public GetConcernCompanyMappingQueryHandler(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<ConcernCompanyMappingDto>> Handle(GetConcernCompanyMappingQuery request, CancellationToken cancellationToken)
        {
            List<ConcernCompanyMappingDto>? concernCompanyMappingDto = new List<ConcernCompanyMappingDto>();
            var concernPersons = await _unitOfWork.ConcernPerson.Queryable
                        .Where(a => a.IsDeleted == 0).ToListAsync();

            foreach (var person in concernPersons)
            {
                var mappingDto = new ConcernCompanyMappingDto();
                mappingDto.ConcernPersonName = person.ConcernPersonName;
                mappingDto.CompanyName =  _unitOfWork.ConcernUserCompanyMapping.Queryable.Where(a=>a.ConcernPersonId == person.ConcernPersonId)
                .Join(_unitOfWork.Company.Queryable.Where(a => a.IsDeleted == 0),
                cpm => cpm.CompanyId,
                c => c.CompanyId,
                (cpm, c) => new { ConcernUserCompanyMapping = cpm, Company = c }
                ).Select(x => x.Company.CompanyName)
                .ToList();

                concernCompanyMappingDto.Add(mappingDto);
            }

            return concernCompanyMappingDto;

        }
    }
}

public sealed class ConcernCompanyMappingDto
{
    public string? ConcernPersonName { get; set; }
    public List<string>? CompanyName { get; set; }
}

