using System.Net;

namespace StockManagement.Features.CompanyFeatures;

public class InsertNewCompanyCommand:IRequest<ApiResponse>
{
    public int CompanyId { get; set; }
    public string? CompanyName { get; set; }
    public string? Picture { get; set; }
    public int IsDeleted { get; set; }

    internal sealed class InsertNewCompanyCommandHandler : IRequestHandler<InsertNewCompanyCommand, ApiResponse>
    {
        private readonly UnitOfWork _unitOfWork;

        public InsertNewCompanyCommandHandler(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ApiResponse> Handle(InsertNewCompanyCommand request, CancellationToken cancellationToken)
        {

            try
            {
                Company company = new Company
                {
                    CompanyName = request.CompanyName,
                    IsDeleted = 0,
                    Picture = request.Picture ?? "",

                };
                await _unitOfWork.Company.AddAsync(company);

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

public class CompanyValidator : AbstractValidator<InsertNewCompanyCommand>
{
    public CompanyValidator()
    {
        RuleFor(a => a.CompanyName)
        .NotEmpty();
    }

  
}
