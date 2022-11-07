using AutoMapper;
using Playmate.Social.Application.GameResults.Commands;
using Playmate.Social.WebAPI.Requests.GameResults;

namespace Playmate.Social.WebAPI.Requests.Mappings;

public class GameResultsMapping : Profile
{
    public GameResultsMapping()
    {
        CreateMap<AddGameResultRequest, AddResultsCommand>();
    }
}
