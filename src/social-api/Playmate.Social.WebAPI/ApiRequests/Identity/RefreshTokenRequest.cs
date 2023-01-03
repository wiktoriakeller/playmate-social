namespace Playmate.Social.WebAPI.ApiRequests.Identity;

public record RefreshTokenRequest
{
    public string JwtToken { get; init; }
    public string RefreshToken { get; init; }
}
