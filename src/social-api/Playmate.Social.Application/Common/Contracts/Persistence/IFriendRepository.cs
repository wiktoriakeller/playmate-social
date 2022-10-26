using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Common.Contracts.Persistence;
public interface IFriendRepository : IRepository<Friend>
{
    Task<Friend?> GetFriend(User user, Guid friendId);
    Task<IEnumerable<User>> GetFriends(User user);
}
