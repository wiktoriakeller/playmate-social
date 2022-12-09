using Playmate.Social.Application.Friends.Dtos;

namespace Playmate.Social.Application.Friends.Responses;

public class AddFriendRequestResponse
{
    public FriendRequestDto Request { get; set; }

    public AddFriendRequestResponse(FriendRequestDto request)
    {
        Request = request;
    }
}
