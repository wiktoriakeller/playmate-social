namespace Playmate.Social.WebAPI.Requests.GameResults;

public class AddGameResultRequest
{
    public Guid GameId { get; set; }
    public Guid WinnerId { get; set; }
    public Guid LoserId { get; set; }
}
