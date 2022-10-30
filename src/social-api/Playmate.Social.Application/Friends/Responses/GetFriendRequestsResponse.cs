using Playmate.Social.Application.Friends.Dtos;

namespace Playmate.Social.Application.Friends.Responses;

public class GetFriendRequestsResponse
{
    public IEnumerable<FriendRequestDto> Requests { get; set; }

    public GetFriendRequestsResponse(IEnumerable<FriendRequestDto> requests)
    {
        Requests = requests;
    }
}
