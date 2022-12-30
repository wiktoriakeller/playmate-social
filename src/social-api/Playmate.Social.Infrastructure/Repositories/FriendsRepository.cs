using Microsoft.EntityFrameworkCore;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Friends.Dtos;
using Playmate.Social.Domain.Entities;
using Playmate.Social.Infrastructure.Persistence;

namespace Playmate.Social.Infrastructure.Repositories;

public class FriendsRepository : BaseRepository<Friend>, IFriendsRepository
{
    public FriendsRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<User>> GetFriendsAsync(User user)
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

    public async Task<IEnumerable<FriendDto>> GetFriendDtosAsync(User user)
    {
        var friends = _dbContext.Set<Friend>()
            .Where(f => f.RequesterId == user.Id)
            .Include(f => f.Addressee)
            .Select(f => new FriendDto
            {
                Id = f.Addressee.Id,
                Username = f.Addressee.Username,
                FriendsSince = f.FriendsSince
            });

        var friends2 = _dbContext.Set<Friend>()
            .Where(f => f.AddresseeId == user.Id)
            .Include(f => f.Requester)
            .Select(f => new FriendDto
            {
                Id = f.Requester.Id,
                Username = f.Requester.Username,
                FriendsSince = f.FriendsSince
            })
            .Concat(friends);

        return await friends2
            .OrderBy(f => f.Username)
            .ToListAsync();
    }

    public async Task<IEnumerable<User>> GetFriendsWhereAsync(User user, Func<User, bool> predicate)
    {
        var friends = await GetFriendsAsync(user);
        return friends.Where(predicate);
    }

    public async Task<IEnumerable<FriendDto>> GetFriendDtosWhereAsync(User user, Func<FriendDto, bool> predicate)
    {
        var friends = await GetFriendDtosAsync(user);
        return friends.Where(predicate);
    }

    public async Task<Friend?> GetFriendByIdAsync(User user, Guid friendId) =>
        await _dbContext.Set<Friend>()
        .Where(f => f.AddresseeId == user.Id && f.RequesterId == friendId || f.RequesterId == user.Id && f.AddresseeId == friendId)
        .FirstOrDefaultAsync();
}
