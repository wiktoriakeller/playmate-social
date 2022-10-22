namespace Playmate.Social.WebAPI.Requests.Users
{
    public record RefreshTokenRequest
    {
        public string JwtToken { get; init; }
        public string RefreshToken { get; init; }
    }
}
