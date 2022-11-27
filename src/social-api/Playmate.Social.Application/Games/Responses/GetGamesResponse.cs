using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Games.Responses;

public class GetGamesResponse
{
    public IEnumerable<Game> Games { get; init; }

    public GetGamesResponse(IEnumerable<Game>? games)
    {
        Games = games ?? new List<Game>();
    }
}
