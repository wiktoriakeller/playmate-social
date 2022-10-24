using Playmate.Social.Domain.Entities;
using System.Linq.Expressions;

namespace Playmate.Social.Application.Common.Contracts.Persistence;

public interface IRepository<TEntity> where TEntity : IEntity
{
    ValueTask<TEntity?> GetByIdAsync(Guid id);
    IEnumerable<TEntity> GetAll();
    IEnumerable<TEntity> GetWhere(Expression<Func<TEntity, bool>> predicate);
    Task<TEntity?> SignleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate);
    Task<TEntity?> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate);
    Task<TEntity> AddAsync(TEntity entity);
    Task<TEntity> UpdateAsync(TEntity entity);
    Task DeleteAsync(TEntity entity);
}
