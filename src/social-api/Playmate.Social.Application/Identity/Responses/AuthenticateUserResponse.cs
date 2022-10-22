namespace Playmate.Social.Application.Identity.Responses;

public record AuthenticateUserResponse
{
    public string JwtToken { get; init; }
    public string RefreshToken { get; init; }
}
