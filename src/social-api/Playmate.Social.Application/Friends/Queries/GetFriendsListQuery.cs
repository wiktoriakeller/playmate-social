using Playmate.Social.Application.Common;
using Playmate.Social.Application.Friends.Responses;

namespace Playmate.Social.Application.Friends.Queries;

public class GetFriendsListQuery : IRequestWrapper<GetFriendsListResponse>
{
    public string Search { get; init; }
}
