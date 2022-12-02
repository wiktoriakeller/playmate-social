namespace Playmate.Social.Application.Friends.Responses;

public class AddFriendRequestResponse
{
    public Guid Id { get; init; }

    public AddFriendRequestResponse(Guid id)
    {
        Id = id;
    }
}
