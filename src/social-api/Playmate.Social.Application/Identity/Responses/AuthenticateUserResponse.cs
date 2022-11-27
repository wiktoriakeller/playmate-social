namespace Playmate.Social.Application.Identity.Responses;

public record AuthenticateUserResponse
{
    public Guid Id { get; init; }
    public string Email { get; init; }
    public string Username { get; init; }
    public string JwtToken { get; init; }
    public string RefreshToken { get; init; }
}
