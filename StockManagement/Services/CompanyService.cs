using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagement.Contexts;
using StockManagement.DTO;
using StockManagement.Entities;
using StockManagement.Model;
using StockManagement.Repository;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

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
                                }).Where(a => a.IsDeleted == 0).ToListAsync();

        return companies;
    }

    public async Task<CompaniesDTO> GetCompanyByID(int CompanyId)
    {

        var companies = await _unitOfWork.Company.Queryable
                                .Select(query => new CompaniesDTO
                                {
                                    CompanyId = query.CompanyId,
                                    CompanyName = query.CompanyName,
                                    IsDeleted = query.IsDeleted,
                                    Picture = query.Picture
                                }).Where(a=>a.CompanyId==CompanyId).FirstOrDefaultAsync();

        return companies;

    }
    public async Task<ApiResponse<int>> InsertCompany(CompaniesDTO companies)
    {
       
        try
        {
            if (string.IsNullOrEmpty(companies.CompanyName))
            {
                return new ApiResponse<int>() { Success = false, Message = "You have to put Company Name " };
            }
            Company company = new Company
            {
                CompanyName = companies.CompanyName,
                IsDeleted = 0,
                Picture = companies.Picture ?? "",
            };
            await _unitOfWork.Company.AddAsync(company);
            await _unitOfWork.SaveChangesAsync();

            return new ApiResponse<int> { Success = true ,Data=company.CompanyId};
        }
        catch (Exception ex)
        {
            return new ApiResponse<int> { Success = false,Message = ex.Message };
        }

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
