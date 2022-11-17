namespace Playmate.Social.WebAPI.ApiRequests.Users
{
    public record AuthenticateUserRequest
    {
        public string Email { get; init; }
        public string Password { get; init; }
    }
}
