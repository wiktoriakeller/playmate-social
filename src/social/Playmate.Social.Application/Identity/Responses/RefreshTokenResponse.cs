namespace Playmate.Social.Application.Identity.Responses;

public record RefreshTokenResponse
{
    public string JwtToken { get; init; }
    public string RefreshToken { get; init; }
}
