using Playmate.Social.Application.GameResults.Dtos;

namespace Playmate.Social.Application.GameResults.Responses;

public class GetResultsForUserResponse
{
    public IDictionary<Guid, IEnumerable<GameResultDto>> Results { get; init; }

    public GetResultsForUserResponse(IDictionary<Guid, IEnumerable<GameResultDto>> results)
    {
        Results = results;
    }
}
