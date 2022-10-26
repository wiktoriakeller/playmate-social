
using Playmate.Social.Application.Friends.Dtos;

namespace Playmate.Social.Application.Friends.Responses;
public class GetFriendsListResponse
{
    public IEnumerable<FriendDto> Friends { get; set; }
	public GetFriendsListResponse(IEnumerable<FriendDto>? friends)
	{
		Friends = friends ?? new List<FriendDto>();
	}
}
