using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagement.Contexts;
using StockManagement.DTO;
using StockManagement.Entities;
using StockManagement.Repository;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace StockManagement.Services;

public class ProductService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly StockDBContext _db;

    public ProductService(UnitOfWork unitOfWork, StockDBContext db)
    {
        _unitOfWork = unitOfWork;
        _db = db;
    }

    public async Task<IEnumerable<GetProductData>> GetProducCompanyWise(int CompanyId)
    {
        var products = await (from product in _unitOfWork.Product.Queryable
                              where product.CompanyId == CompanyId && product.IsDeleted == 0
                              select new GetProductData
                              {
                                  ProductId = product.ProductId,
                                  ProductName = product.ProductName,
                                  Description = product.Description,
                                  Price = product.Price,
                                  CompanyId = product.CompanyId,
                                  IsActive = product.IsActive,
                                  Sequence = product.Sequence
                              }).ToListAsync();

        return products.ToList();
    }




    public async Task<ProductDTO> GetProducByID(int ProductId)
    {
        var products = await (from product in _unitOfWork.Product.Queryable
                              where product.ProductId == ProductId
                              select new ProductDTO
                              {
                                  ProductId = product.ProductId,
                                  ProductName = product.ProductName,
                                  Description = product.Description,
                                  Price = product.Price,
                                  CompanyId = product.CompanyId,
                                  IsActive = product.IsActive,
                                  Sequence = product.Sequence
                              }).FirstOrDefaultAsync();

        return products;
    }
    public async Task<int> InsertProduct(ProductDTO product)
    {
        int result = 0;
        Product products = new Product
        {
            ProductName = product.ProductName,
            Description = product.Description,
            Price = product.Price,
            CompanyId = product.CompanyId,
            Sequence = product.Sequence,
            IsActive = product.IsActive,
        };
        await _unitOfWork.Product.AddAsync(products);

        await _unitOfWork.SaveChangesAsync();
        result = products.ProductId;

        return result;
    }
    public async Task<int> UpdateProduct(ProductDTO product)
    {
        int result = 0;
        Product products = new Product
        {
            ProductId = product.ProductId,
            ProductName = product.ProductName,
            Description = product.Description,
            Price = product.Price,
            CompanyId = product.CompanyId,
            Sequence = product.Sequence,
            IsActive = product.IsActive,
        };
        _unitOfWork.Product.Update(products);

        await _unitOfWork.SaveChangesAsync();
        result = products.ProductId;

        return result;
    }


    public async Task<int> DeleteProduct(int ProductId)
    {
        int result = 0;
        var data = await _db.Products.Where(a => a.ProductId == ProductId).FirstOrDefaultAsync();
        data.IsDeleted = 1;
        data.IsActive = 0;
        _unitOfWork.Product.Update(data);


        await _unitOfWork.SaveChangesAsync();
        result = data.ProductId;

        return result;
    }
}
