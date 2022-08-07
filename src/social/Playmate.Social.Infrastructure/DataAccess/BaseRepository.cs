using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Playmate.Social.Application.Contracts.DataAccess;
using Playmate.Social.Infrastructure.Persistence;

namespace Playmate.Social.Infrastructure.DataAccess
{
    public class BaseRepositoryAsync<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly ApplicationDbContext _dbContext;

        public BaseRepositoryAsync(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync() => await _dbContext.Set<TEntity>().ToListAsync();

        public async Task<IEnumerable<TEntity>> GetWhereAsync(Expression<Func<TEntity, bool>> predicate) =>
            await _dbContext.Set<TEntity>().Where(predicate).ToListAsync();

        public Task<TEntity?> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate) =>
            _dbContext.Set<TEntity>().FirstOrDefaultAsync(predicate);

        public Task<TEntity?> SignleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate) =>
            _dbContext.Set<TEntity>().SingleOrDefaultAsync(predicate);

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            _dbContext.Set<TEntity>().Add(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }

        public async Task<TEntity> UpdateAsync(TEntity entity)
        {
            _dbContext.Update(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }

        public async Task BulkUpdateAsync(IEnumerable<TEntity> entities)
        {
            _dbContext.UpdateRange(entities);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(TEntity entity)
        {
            _dbContext.Remove(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}