using AutoMapper;
using Playmate.Social.Application.Games.Commands;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Games;

public class GamesMappingProfile : Profile
{
    public GamesMappingProfile()
    {
        CreateMap<RegisterGameCommand, Game>();
    }
}
