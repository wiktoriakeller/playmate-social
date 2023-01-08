namespace Playmate.Social.WebAPI.ApiRequests.Users;

public class UpdateUserRequest
{
    public string Username { get; init; }
    public IFormFile? Picture { get; init; }
}
