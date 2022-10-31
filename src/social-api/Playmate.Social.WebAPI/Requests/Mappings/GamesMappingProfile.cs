using AutoMapper;
using Playmate.Social.Application.Games.Commands;
using Playmate.Social.WebAPI.Requests.Games;

namespace Playmate.Social.WebAPI.Requests.Mappings;

public class GamesMappingProfile : Profile
{
    public GamesMappingProfile()
    {
        CreateMap<RegisterGameRequest, RegisterGameCommand>();
    }
}
