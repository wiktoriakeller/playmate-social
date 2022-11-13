using Playmate.Social.Domain.Entities;
using System.Linq.Expressions;

namespace Playmate.Social.Application.Common.Contracts.Persistence;

public interface IFriendRepository : IRepository<Friend>
{
    Task<IEnumerable<User>> GetFriendsWhere(User user, Expression<Func<User, bool>> predicate);

    Task<Friend?> GetFriend(User user, Guid friendId);
}
