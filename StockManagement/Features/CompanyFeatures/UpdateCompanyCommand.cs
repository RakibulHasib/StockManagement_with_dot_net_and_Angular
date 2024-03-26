using StockManagement.Repository;
using System.Net;

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
                return new ApiResponse<int> 
                {
                    Status = Status.Success,
                    StatusCode=(int)HttpStatusCode.OK,
                    Data = company.CompanyId 
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
