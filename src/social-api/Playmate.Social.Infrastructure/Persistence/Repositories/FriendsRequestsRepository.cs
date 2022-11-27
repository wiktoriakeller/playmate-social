using Microsoft.EntityFrameworkCore;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Domain.Entities;
using System.Linq.Expressions;

namespace Playmate.Social.Infrastructure.Persistence.Repositories;

public class FriendsRequestsRepository : BaseRepository<FriendRequest>, IFriendsRequestsRepository
{
    public FriendsRequestsRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
    }

    public override IEnumerable<FriendRequest> GetWhere(Expression<Func<FriendRequest, bool>> predicate)
    {
        return _dbContext.Set<FriendRequest>().Where(predicate).Include(r => r.Requester);
    }

    public async Task<IEnumerable<Guid>> GetUsersWithPendingRequests(User currentUser)
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
