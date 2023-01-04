using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Common.Contracts.Persistence;

public interface IFriendRequestsRepository : IRepository<FriendRequest>
{
    Task<IEnumerable<Guid>> GetUsersWithPendingRequestsAsync(User currentUser);
}
