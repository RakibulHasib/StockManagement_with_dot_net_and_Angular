using MediatR;
using Microsoft.EntityFrameworkCore;
using StockManagement.DTO;
using StockManagement.Repository;

namespace StockManagement.Features.Company
{
    public class GetCompanyByCompanyIdQuery : IRequest<CompaniesDTO?>
    {
        public int CompanyId { get; set; }

        internal sealed class GetCompanyByCompanyIdQueryHandler : IRequestHandler<GetCompanyByCompanyIdQuery, CompaniesDTO?>
        {
            private readonly UnitOfWork _unitOfWork;

            public GetCompanyByCompanyIdQueryHandler(UnitOfWork unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }

            public async Task<CompaniesDTO?> Handle(GetCompanyByCompanyIdQuery request, CancellationToken cancellationToken)
            {
                return await _unitOfWork.Company.Queryable
                                .Where(a => a.CompanyId == request.CompanyId)
                                .Select(query => new CompaniesDTO
                                {
                                    CompanyId = query.CompanyId,
                                    CompanyName = query.CompanyName,
                                    IsDeleted = query.IsDeleted,
                                    Picture = query.Picture
                                }).FirstOrDefaultAsync();
            }
        }
    }
}
