namespace StockManagement.Features.StockFeatures
{
    public class GetStockDataPerDayQuery : IRequest<List<DailyDataDTO>>
    {
        public int companyId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        internal sealed class GetStockDataPerDayQueryHandler : IRequestHandler<GetStockDataPerDayQuery, List<DailyDataDTO>>
        {
            private readonly UnitOfWork _unitOfWork;
            public GetStockDataPerDayQueryHandler(UnitOfWork unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }
            public async Task<List<DailyDataDTO>> Handle(GetStockDataPerDayQuery request, CancellationToken cancellationToken)
            {
                return await _unitOfWork.Stock.Queryable
                    .Where(x => x.CreationTime.Date >= request.StartDate.Date && x.CreationTime.Date <= request.EndDate.Date
                    && x.CompanyId == (request.companyId == 0 ? x.CompanyId : request.companyId) && x.IsDeleted == 0)
                .Select(query => new DailyDataDTO
                {
                    StockId = query.StockId,
                    CompanyName = query.Company.CompanyName,
                    CreationTime = query.CreationTime,
                    TotalSalesQuantity = query.TotalSalesQuantity,
                    TotalAmount = query.GrandTotalAmount
                }).OrderByDescending(a => a.StockId).ToListAsync();
            }
        }
    }
}
