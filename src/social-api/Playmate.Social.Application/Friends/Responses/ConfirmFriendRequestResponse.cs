using Playmate.Social.Application.Friends.Dtos;

namespace Playmate.Social.Application.Friends.Responses;

public class ConfirmFriendRequestResponse
{
    public bool RequestAccepted { get; set; }
    public FriendDto? CreatedFriend { get; set; }
    public FriendDto? RequestFrom { get; set; }
}
