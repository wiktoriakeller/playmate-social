namespace Playmate.Social.WebAPI.ApiRequests.GameResults;

public class AddGameResultRequest
{
    public Guid GameId { get; init; }
    public Guid WinnerId { get; init; }
    public Guid LoserId { get; init; }
}
