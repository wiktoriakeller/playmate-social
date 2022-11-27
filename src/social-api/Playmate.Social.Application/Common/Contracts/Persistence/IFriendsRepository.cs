using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Common.Contracts.Persistence;

public interface IFriendsRepository : IRepository<Friend>
{
    Task<IEnumerable<User>> GetFriendsAsync(User user);

    Task<IEnumerable<User>> GetFriendsWhereAsync(User user, Func<User, bool> predicate);

    Task<Friend?> GetFriendByIdAsync(User user, Guid friendId);
}
