using AutoMapper;
using Playmate.Social.Application.GameResults.Commands;
using Playmate.Social.WebAPI.ApiRequests.GameResults;

namespace Playmate.Social.WebAPI.ApiRequests.Mappings;

internal class GameResultsMappingProfile : Profile
{
    public GameResultsMappingProfile()
    {
        CreateMap<AddGameResultRequest, AddGameResultCommand>();
    }
}
