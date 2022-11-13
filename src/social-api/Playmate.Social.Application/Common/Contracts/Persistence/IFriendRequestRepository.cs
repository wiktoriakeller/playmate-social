using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Common.Contracts.Persistence;

public interface IFriendRequestRepository : IRepository<FriendRequest>
{
    Task<IEnumerable<Guid>> GetUsersWithPendingRequests(User currentUser);
}
