using Playmate.Social.Application.Friends.Dtos;

namespace Playmate.Social.Application.Friends.Responses;

public class AnswerFriendRequestResponse
{
    public bool RequestAccepted { get; set; }
    public FriendDto? CreatedFriend { get; set; }
}
