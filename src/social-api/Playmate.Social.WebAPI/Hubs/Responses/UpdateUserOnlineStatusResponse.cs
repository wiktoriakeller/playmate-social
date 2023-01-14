namespace Playmate.Social.WebAPI.Hubs.Responses;

public class UpdateUserOnlineStatusResponse
{
    public string UserId { get; init; }
    public bool IsOnline { get; init; }
}
