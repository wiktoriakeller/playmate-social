using AutoMapper;
using Playmate.Social.Application.Games.Commands;
using Playmate.Social.WebAPI.ApiRequests.Games;

namespace Playmate.Social.WebAPI.ApiRequests.Mappings;

internal class GamesMappingProfile : Profile
{
    public GamesMappingProfile()
    {
        CreateMap<RegisterGameRequest, RegisterGameCommand>();
    }
}
