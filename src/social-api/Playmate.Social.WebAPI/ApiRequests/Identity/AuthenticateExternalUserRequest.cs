namespace Playmate.Social.WebAPI.ApiRequests.Identity;

public class AuthenticateExternalUserRequest
{
    public string Token { get; set; }
    public string Provider { get; set; }
}
