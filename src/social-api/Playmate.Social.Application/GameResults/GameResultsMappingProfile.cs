using AutoMapper;
using Playmate.Social.Application.GameResults.Commands;
using Playmate.Social.Application.GameResults.Dtos;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.GameResults;

internal class GameResultsMappingProfile : Profile
{
    public GameResultsMappingProfile()
    {
        CreateMap<AddGameResultCommand, GameResult>();
        CreateMap<GameResult, GameResultDto>();
    }
}
