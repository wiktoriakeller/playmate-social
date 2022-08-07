using System.Linq.Expressions;

namespace Playmate.Social.Application.Contracts.DataAccess
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAllAsync();

        Task<IEnumerable<TEntity>> GetWhereAsync(Expression<Func<TEntity, bool>> predicate);

        Task<TEntity?> SignleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate);

        Task<TEntity?> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate);

        Task<TEntity> AddAsync(TEntity entity);

        Task<TEntity> UpdateAsync(TEntity entity);

        Task BulkUpdateAsync(IEnumerable<TEntity> entities);

        Task DeleteAsync(TEntity entity);
    }
}