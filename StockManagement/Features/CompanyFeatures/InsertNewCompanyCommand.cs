using MediatR;
using StockManagement.Contexts;
using StockManagement.DTO;
using StockManagement.Entities;
using StockManagement.Repository;


namespace StockManagement.Features.CompanyFeatures;

public class InsertNewCompanyCommand:IRequest<int>
{
    public int CompanyId { get; set; }
    public string? CompanyName { get; set; }
    public string? Picture { get; set; }
    public int IsDeleted { get; set; }

    internal sealed class InsertNewCompanyCommandHandler : IRequestHandler<InsertNewCompanyCommand, int>
    {
        private readonly UnitOfWork _unitOfWork;

        public InsertNewCompanyCommandHandler(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<int> Handle(InsertNewCompanyCommand request, CancellationToken cancellationToken)
        {
            Company company = new Company
            {
                CompanyName = request.CompanyName,
                IsDeleted = 0,
                Picture = request.Picture ?? "",


            };
            await _unitOfWork.Company.AddAsync(company);

            await _unitOfWork.SaveChangesAsync();

            return company.CompanyId;

        }
    }
   
}
