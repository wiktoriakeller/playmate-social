namespace Playmate.Social.WebAPI.ApiRequests.Identity;

public class AuthenticateExternalUserRequest
{
    public string Token { get; init; }
    public string Provider { get; init; }
}
