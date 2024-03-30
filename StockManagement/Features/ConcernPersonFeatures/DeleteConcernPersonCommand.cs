namespace StockManagement.Features.ConcernPersonFeatures;

public class DeleteConcernPersonCommand:IRequest<ApiResponse>
{
    public int ConcernPersonId { get; set; }
    public int IsDeleted { get; set; }
    internal sealed class DeleteConcernPersonCommandHandler : IRequestHandler<DeleteConcernPersonCommand, ApiResponse>
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly ConcernPersonService _concernService;

        public DeleteConcernPersonCommandHandler(UnitOfWork unitOfWork, ConcernPersonService concernService)
        {
            _unitOfWork = unitOfWork;
            _concernService = concernService;
        }


    

        public async Task<ApiResponse> Handle(DeleteConcernPersonCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var concern_person = await _concernService.GetConcernPersonByID(request.ConcernPersonId);
                concern_person.IsDeleted = 1;
               
                _unitOfWork.ConcernPerson.Update(concern_person);

                await _unitOfWork.SaveChangesAsync();
                return new ApiResponse<int>
                {
                    Status = Status.Success,
                    StatusCode = (int)HttpStatusCode.OK,
                    Data = concern_person.ConcernPersonId
                };
            }
            catch (Exception ex)
            {

                return new ApiResponse
                {
                    Message = ex.Message,
                    Status = Status.Success,
                    StatusCode = (int)HttpStatusCode.InternalServerError,
                };
            }
        }
    }
}
