namespace Playmate.Social.WebAPI.ApiRequests.Users;

public class AuthenticateExternalUserRequest
{
    public string Token { get; set; }
    public string Provider { get; set; }
}
