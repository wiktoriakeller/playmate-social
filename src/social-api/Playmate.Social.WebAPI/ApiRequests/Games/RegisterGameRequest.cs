namespace Playmate.Social.WebAPI.ApiRequests.Games;

public class RegisterGameRequest
{
    public string Name { get; init; }
    public string Description { get; init; }
    public string ServerUrl { get; init; }
    public IFormFile? Picture { get; init; }
}
