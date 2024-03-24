using StockManagement.Repository;

namespace StockManagement.Features.CompanyFeatures;

public class UpdateCompanyCommand:IRequest<ApiResponse>
{
    public int CompanyId { get; set; }
    public string? CompanyName { get; set; }
    public string? Picture { get; set; }
    public int IsDeleted { get; set; }
    internal sealed class UpdateCompanyCommandHandler : IRequestHandler<UpdateCompanyCommand, ApiResponse>
    {
        private readonly UnitOfWork _unitOfWork;

        public UpdateCompanyCommandHandler(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<ApiResponse> Handle(UpdateCompanyCommand request, CancellationToken cancellationToken)
        {
            try
            {
                Company company = new Company
                {
                    CompanyId = request.CompanyId,
                    CompanyName = request.CompanyName,
                    IsDeleted = 0,
                    Picture = request.Picture ?? "",

                };
                 _unitOfWork.Company.Update(company);

                await _unitOfWork.SaveChangesAsync();
                return new ApiResponse<int> { Success = true, Data = company.CompanyId };
            }
            catch (Exception)
            {

                return new ApiResponse { Success = true, Message = "Internal Server Error " };
            }
        }
    }
}
