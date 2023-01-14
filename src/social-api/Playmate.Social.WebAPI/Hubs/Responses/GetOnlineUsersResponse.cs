namespace Playmate.Social.WebAPI.Hubs.Responses;

public class GetOnlineUsersResponse
{
    public IEnumerable<string> UserIds { get; init; }
}
