namespace Playmate.Social.Application.GameResults.Responses;

public class AddResultsResponse
{
    public Guid Id { get; set; }

    public AddResultsResponse(Guid id)
    {
        Id = id;
    }
}
