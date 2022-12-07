namespace Playmate.Social.WebAPI.ApiRequests.Friends;

public class AddFriendRequest
{
    public string Username { get; set; }
    public string ReceiverId { get; init; }
}
