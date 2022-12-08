namespace Playmate.Social.WebAPI.ApiRequests.Friends;

public class ConfirmFriendRequest
{
    public bool Accept { get; init; }
    public Guid RequestId { get; init; }
}
