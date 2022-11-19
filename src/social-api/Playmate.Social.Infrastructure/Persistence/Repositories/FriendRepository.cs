using Microsoft.EntityFrameworkCore;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Infrastructure.Persistence.Repositories;

public class FriendRepository : BaseRepository<Friend>, IFriendRepository
{
    public FriendRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<User>> GetFriends(User user)
    {
        var friends = _dbContext.Set<Friend>()
            .Where(f => f.RequesterId == user.Id)
            .Include(f => f.Addressee)
            .Select(f => f.Addressee);

        var friends2 = _dbContext.Set<Friend>()
            .Where(f => f.AddresseeId == user.Id)
            .Include(f => f.Requester)
            .Select(f => f.Requester)
            .Concat(friends);

        return await friends2
            .OrderBy(f => f.Username)
            .ToListAsync();
    }

    public async Task<IEnumerable<User>> GetFriendsWhere(User user, Func<User, bool> predicate)
    {
        var friends = await GetFriends(user);
        return friends.Where(predicate);
    }

    public async Task<Friend?> GetFriend(User user, Guid friendId) =>
        await _dbContext.Set<Friend>()
        .Where(f => f.AddresseeId == user.Id && f.RequesterId == friendId || f.RequesterId == user.Id && f.AddresseeId == friendId)
        .FirstOrDefaultAsync();
}
