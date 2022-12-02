namespace Playmate.Social.Application.Friends.Responses;

public class RemoveFriendResponse
{
    public Guid FriendId { get; init; }

    public RemoveFriendResponse(Guid friendId)
    {
        FriendId = friendId;
    }
}
