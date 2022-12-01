using Playmate.Social.Application.Friends.Dtos;

namespace Playmate.Social.Application.Friends.Responses;

public class GetFriendsListResponse
{
    public IEnumerable<FriendListItemDto> Friends { get; init; }

    public GetFriendsListResponse(IEnumerable<FriendListItemDto>? friends)
    {
        Friends = friends ?? new List<FriendListItemDto>();
    }
}
