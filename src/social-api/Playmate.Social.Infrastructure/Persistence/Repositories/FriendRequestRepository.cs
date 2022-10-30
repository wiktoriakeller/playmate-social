using Microsoft.EntityFrameworkCore;
using Playmate.Social.Domain.Entities;
using System.Linq.Expressions;

namespace Playmate.Social.Infrastructure.Persistence.Repositories;

public class FriendRequestRepository : BaseRepository<FriendRequest>
{
    public FriendRequestRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
    }

    public override IEnumerable<FriendRequest> GetWhere(Expression<Func<FriendRequest, bool>> predicate)
    {
        return _dbContext.Set<FriendRequest>().Where(predicate).Include(r => r.Requester);
    }
}
