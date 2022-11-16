namespace Playmate.Social.WebAPI.ApiRequests.Users
{
    public record RefreshTokenRequest
    {
        public string JwtToken { get; init; }
        public string RefreshToken { get; init; }
    }
}
