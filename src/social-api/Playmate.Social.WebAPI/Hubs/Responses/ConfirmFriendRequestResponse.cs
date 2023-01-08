using Playmate.Social.Application.Friends.Dtos;

namespace Playmate.Social.WebAPI.Hubs.Responses;

public class ConfirmFriendRequestResponse
{
    public FriendDto CreatedFriend { get; init; }
}
