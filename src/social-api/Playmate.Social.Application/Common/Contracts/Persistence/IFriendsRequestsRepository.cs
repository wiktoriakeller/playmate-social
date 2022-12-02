using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Common.Contracts.Persistence;

public interface IFriendsRequestsRepository : IRepository<FriendRequest>
{
    Task<IEnumerable<Guid>> GetUsersWithPendingRequestsAsync(User currentUser);
}
