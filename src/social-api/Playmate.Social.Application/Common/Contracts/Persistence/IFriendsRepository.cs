using Playmate.Social.Application.Friends.Dtos;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Common.Contracts.Persistence;

public interface IFriendsRepository : IRepository<Friend>
{
    Task<IEnumerable<User>> GetFriendsAsync(User user);

    Task<IEnumerable<FriendDto>> GetFriendDtosAsync(User user);

    Task<IEnumerable<User>> GetFriendsWhereAsync(User user, Func<User, bool> predicate);

    Task<IEnumerable<FriendDto>> GetFriendDtosWhereAsync(User user, Func<FriendDto, bool> predicate);

    Task<Friend?> GetFriendByIdAsync(User user, Guid friendId);
}
