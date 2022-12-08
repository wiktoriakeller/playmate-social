namespace Playmate.Social.Application.GameResults.Responses;

public class AddGameResultResponse
{
    public Guid Id { get; init; }

    public AddGameResultResponse(Guid id)
    {
        Id = id;
    }
}
