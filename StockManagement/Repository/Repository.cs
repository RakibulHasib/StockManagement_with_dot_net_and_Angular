﻿using Microsoft.EntityFrameworkCore;
using StockManagement.Contexts;
using System.Linq.Expressions;
using System.Reflection;

namespace StockManagement.Repository;

public class Repository<TEntity, TId> where TEntity : class
{
    private DbSet<TEntity> _table;

    public Repository(StockDBContext context)
    {
        _table = context.Set<TEntity>();
    }

    public IQueryable<TEntity> Queryable => _table;

    public async Task<List<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate)
    {
        return await _table.Where(predicate).ToListAsync();
    }

    public async Task<TEntity> FindAsync(TId id, CancellationToken cancellationToken = default)
    {
        return await _table.FindAsync(new object[] { id }, cancellationToken);
    }

    public async Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate)
    {
        return await _table.FirstOrDefaultAsync(predicate);
    }

    public async Task<bool> IsExistAsync(Expression<Func<TEntity, bool>> predicate)
    {
        return await _table.Where(predicate).AnyAsync();
    }

    public async Task AddAsync(TEntity entity)
    {
        PropertyInfo[] properties = entity.GetType().GetProperties();
        foreach (var property in properties)
        {
            if (property.Name.Equals("CreationTime", StringComparison.OrdinalIgnoreCase))
            {
                property.SetValue(entity, DateTime.Now);
            }
        }
        await _table.AddAsync(entity);
    }


    public async Task AddRangeAsync(IEnumerable<TEntity> entities)
    {
        foreach (var entity in entities)
        {
            PropertyInfo[] properties = entity.GetType().GetProperties();
            foreach (var property in properties)
            {
                if (property.Name.Equals("CreationTime", StringComparison.OrdinalIgnoreCase))
                {
                    property.SetValue(entity, DateTime.Now);
                }
            }
        }
        await _table.AddRangeAsync(entities);
    }

    public void Update(TEntity entity)
    {
        _table.Update(entity);
    }

    public void UpdateRangeAsync(IEnumerable<TEntity> entities)
    {
        _table.UpdateRange(entities);
    }

    public void Delete(TEntity entity)
    {
        _table.Remove(entity);
    }

    public void DeleteRange(IEnumerable<TEntity> entities)
    {
        _table.RemoveRange(entities);
    }

}
