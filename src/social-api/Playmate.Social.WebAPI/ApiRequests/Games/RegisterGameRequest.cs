namespace Playmate.Social.WebAPI.ApiRequests.Games;

public class RegisterGameRequest
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string ServerUrl { get; set; }
    public string ImageUrl { get; set; }
}
