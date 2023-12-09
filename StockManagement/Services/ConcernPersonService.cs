using Microsoft.EntityFrameworkCore;
using StockManagement.Contexts;
using StockManagement.DTO;
using StockManagement.Entities;
using StockManagement.Repository;

namespace StockManagement.Services;

public class ConcernPersonService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly StockDBContext _db;

    public ConcernPersonService(UnitOfWork unitOfWork, StockDBContext db)
    {
        _unitOfWork = unitOfWork;
        _db = db;
    }


    public async Task<IEnumerable<ConcernPersonDTO>> GetConcernPersonList()
    {
        var concernPeople = await _unitOfWork.ConcernPerson.Queryable
                                .Select(query => new ConcernPersonDTO
                                {
                                    ConcernPersonId = query.ConcernPersonId,
                                    ConcernPersonName = query.ConcernPersonName,
                                    IsDeleted = query.IsDeleted
                                }).Where(a => a.IsDeleted == 0).ToListAsync();

        return concernPeople;
    }
    public async Task<ConcernPersonDTO> GetConcernPersonByID(int? ConcernPersonId)
    {

        var concernPeople = await _unitOfWork.ConcernPerson.Queryable
                                .Select(query => new ConcernPersonDTO
                                {
                                    ConcernPersonId = query.ConcernPersonId,
                                    ConcernPersonName = query.ConcernPersonName ?? "",
                                    IsDeleted = query.IsDeleted
                                }).Where(a => a.ConcernPersonId == ConcernPersonId).FirstOrDefaultAsync();


        return concernPeople;

    }

    public async Task<int> InsertConcernPersonList(ConcernPersonDTO ConcernPersonDTO)
    {
        ConcernPerson concernPerson = new ConcernPerson
        {
            ConcernPersonName = ConcernPersonDTO.ConcernPersonName ?? "",
            IsDeleted = 0,
        };
        await _unitOfWork.ConcernPerson.AddAsync(concernPerson);

        await _unitOfWork.SaveChangesAsync();

        return concernPerson.ConcernPersonId;
    }
    public async Task<int> UpdateConcernPersonList(ConcernPersonDTO ConcernPersonDTO)
    {

        ConcernPerson concernPerson = new ConcernPerson
        {
            ConcernPersonId = ConcernPersonDTO.ConcernPersonId,
            ConcernPersonName = ConcernPersonDTO.ConcernPersonName,

        };
        _unitOfWork.ConcernPerson.Update(concernPerson);

        await _unitOfWork.SaveChangesAsync();

        return concernPerson.ConcernPersonId;
    }

    public async Task<int> DeleteConcernPerson(int ConcernPersonId)
    {
        
        var data = await _db.ConcernPeople.Where(a => a.ConcernPersonId == ConcernPersonId).FirstOrDefaultAsync();
        data.IsDeleted = 1;

        _unitOfWork.ConcernPerson.Update(data);

        await _unitOfWork.SaveChangesAsync();

        return data.ConcernPersonId;
    }
}
