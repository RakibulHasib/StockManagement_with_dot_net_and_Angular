using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagement.Contexts;
using StockManagement.DTO;
using StockManagement.Entities;
using StockManagement.Repository;

namespace StockManagement.Services;

public class CompanyService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly StockDBContext _db;

    public CompanyService(UnitOfWork unitOfWork, StockDBContext db)
    {
        _unitOfWork = unitOfWork;
        _db = db;
    }

    public async Task<IEnumerable<CompaniesDTO>>GetCompanyList()
    {
        var companies = await _unitOfWork.Company.Queryable
                                .Select(query => new CompaniesDTO
                                {
                                    CompanyId = query.CompanyId,
                                    CompanyName = query.CompanyName,
                                    IsDeleted = query.IsDeleted,
                                    Picture = query.Picture
                                })
                                .ToListAsync();

        return companies.Select(c => new CompaniesDTO
        {
            CompanyId = c.CompanyId,
            CompanyName = c.CompanyName,
            IsDeleted = c.IsDeleted,
            Picture = c.Picture
        }).ToList();
    }

    public async Task<CompaniesDTO> GetCompanyByID(int CompanyId)
    {
        var companie = await _unitOfWork.Company.Queryable
                                .Select(query => new CompaniesDTO
                                {
                                    CompanyId = query.CompanyId,
                                    CompanyName = query.CompanyName,
                                    IsDeleted = query.IsDeleted,
                                    Picture = query.Picture
                                }).FirstOrDefaultAsync();

        return companie;

    }
    public async Task<int> InsertCompany(CompaniesDTO companies)
    {
        int result = 0;
        Company company = new Company
        {
            CompanyName = companies.CompanyName,
            IsDeleted = 0,
            Picture = companies.Picture
        };
        await _unitOfWork.Company.AddAsync(company);

        result= await _unitOfWork.SaveChangesAsync();

        return result;
    }

    public async Task<int> UpdateCompany(CompaniesDTO companies)
    {
        int result = 0;
        Company company = new Company
        {
            CompanyId = companies.CompanyId,
            CompanyName = companies.CompanyName,
            IsDeleted = 0,
            Picture = companies.Picture
        };
         _unitOfWork.Company.Update(company);

        result = await _unitOfWork.SaveChangesAsync();

        return result;
    }

    public async Task<int> DeleteCompany(int CompanyId)
    {
        int result = 0;
        var data = await _db.Companies.Where(a => a.CompanyId == CompanyId).FirstOrDefaultAsync();
        data.IsDeleted = 1;
        _unitOfWork.Company.Update(data);

        result = await _unitOfWork.SaveChangesAsync();

        return result;
    }

}
