namespace Playmate.Social.WebAPI.ApiRequests.Users
{
    public record CreateUserRequest
    {
        public string Email { get; init; }
        public string Password { get; init; }
        public string UserName { get; init; }
    }
}
