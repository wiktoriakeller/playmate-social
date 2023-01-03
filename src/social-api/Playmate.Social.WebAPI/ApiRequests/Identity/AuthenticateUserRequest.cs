namespace Playmate.Social.WebAPI.ApiRequests.Identity;

public record AuthenticateUserRequest
{
    public string Email { get; init; }
    public string Password { get; init; }
}
