using Playmate.Social.Application.Friends.Dtos;

namespace Playmate.Social.Application.Friends.Responses;
public class GetFriendRequestsResponse
{
    public GetFriendRequestsResponse(IEnumerable<FriendRequestDto> requests)
    {
        Requests = requests;
    }

    public IEnumerable<FriendRequestDto> Requests { get; set; }
}
