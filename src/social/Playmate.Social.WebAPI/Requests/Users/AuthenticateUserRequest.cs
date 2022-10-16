namespace Playmate.Social.WebAPI.Requests.Users
{
    public record AuthenticateUserRequest
    {
        public string Email { get; init; }
        public string Password { get; init; }
    }
}
