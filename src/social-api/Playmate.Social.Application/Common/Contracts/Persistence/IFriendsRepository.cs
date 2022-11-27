using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Common.Contracts.Persistence;

public interface IFriendsRepository : IRepository<Friend>
{
    Task<IEnumerable<User>> GetFriends(User user);

    Task<IEnumerable<User>> GetFriendsWhere(User user, Func<User, bool> predicate);

    Task<Friend?> GetFriend(User user, Guid friendId);
}
