using StockManagement.Entities;
using StockManagement.Services;
using System.Net;

namespace StockManagement.Features.CompanyFeatures;

public class DeleteCompanyCommand :IRequest<ApiResponse>
{
    public int CompanyId { get; set; }
    public int IsDeleted { get; set; }
    internal sealed class DeleteCompanyCommandHandler : IRequestHandler<DeleteCompanyCommand, ApiResponse>
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly CompanyService _companyService;

        public DeleteCompanyCommandHandler(UnitOfWork unitOfWork, CompanyService companyService = null)
        {
            _unitOfWork = unitOfWork;
            _companyService = companyService;
        }


        public async Task<ApiResponse> Handle(DeleteCompanyCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var company = await _companyService.GetCompanyByID(request.CompanyId);
                company.IsDeleted = 1;
                //Company company = new Company
                //{
                //    CompanyId = request.CompanyId,
                //    IsDeleted = request.IsDeleted,
                //};
                _unitOfWork.Company.Update(company);

                await _unitOfWork.SaveChangesAsync();
                return new ApiResponse<int>
                {
                    Status = Status.Success,
                    StatusCode = (int)HttpStatusCode.OK,
                    Data = company.CompanyId
                };
            }
            catch (Exception ex)
            {

                return new ApiResponse
                {
                    Message= ex.Message,
                    Status = Status.Success,
                    StatusCode = (int)HttpStatusCode.InternalServerError,
                };
            }
        }
    }
}
