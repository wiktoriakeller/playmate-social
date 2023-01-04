namespace Playmate.Social.WebAPI.ApiRequests.Identity;

public record CreateUserRequest
{
    public string Email { get; init; }
    public string Password { get; init; }
    public string Username { get; init; }
}
