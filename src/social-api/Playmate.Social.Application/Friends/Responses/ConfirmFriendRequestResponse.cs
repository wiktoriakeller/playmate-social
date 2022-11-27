namespace Playmate.Social.Application.Friends.Responses;

public class ConfirmFriendRequestResponse
{
    public Guid Id { get; init; }

    public ConfirmFriendRequestResponse(Guid id)
    {
        Id = id;
    }
}
