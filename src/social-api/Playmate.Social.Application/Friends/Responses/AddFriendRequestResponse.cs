namespace Playmate.Social.Application.Friends.Responses;

public class AddFriendRequestResponse
{
    public AddFriendRequestResponse(Guid id)
    {
        Id = id;
    }

    public Guid Id { get; set; }
}
