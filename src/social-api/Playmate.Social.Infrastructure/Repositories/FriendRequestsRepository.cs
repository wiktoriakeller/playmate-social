using Microsoft.EntityFrameworkCore;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Domain.Entities;
using Playmate.Social.Infrastructure.Persistence;
using System.Linq.Expressions;

namespace Playmate.Social.Infrastructure.Repositories;

public class FriendRequestsRepository : BaseRepository<FriendRequest>, IFriendRequestsRepository
{
    public FriendRequestsRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
    }

    public async ValueTask<FriendRequest?> GetByIdAsync(Guid id) => await _dbContext.Set<FriendRequest>()
        .Include(x => x.Addressee)
        .Include(x => x.Requester)
        .FirstOrDefaultAsync(x => x.Id == id);

    public override IEnumerable<FriendRequest> GetWhere(Expression<Func<FriendRequest, bool>> predicate) =>
        _dbContext.Set<FriendRequest>().Where(predicate).Include(r => r.Requester);

    public async Task<IEnumerable<Guid>> GetUsersWithPendingRequestsAsync(User currentUser)
    {
        var users = _dbContext.Set<FriendRequest>()
            .Where(f => f.RequesterId == currentUser.Id)
            .Include(f => f.Addressee)
            .Select(f => f.AddresseeId);

        var users2 = _dbContext.Set<FriendRequest>()
            .Where(f => f.AddresseeId == currentUser.Id)
            .Include(f => f.Requester)
            .Select(f => f.RequesterId)
            .Concat(users);

        return await users2.ToListAsync();
    }
}
