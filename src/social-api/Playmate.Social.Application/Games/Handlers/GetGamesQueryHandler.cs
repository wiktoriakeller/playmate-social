using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Games.Queries;
using Playmate.Social.Application.Games.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Games.Handlers;

public class GetGamesQueryHandler : IHandlerWrapper<GetGamesQuery, GetGamesResponse>
{
    private readonly IRepository<Game> _gameRepository;

    public GetGamesQueryHandler(IRepository<Game> gameRepository)
    {
        _gameRepository = gameRepository;
    }

    public Task<Response<GetGamesResponse>> Handle(GetGamesQuery request, CancellationToken cancellationToken)
    {
        var games = _gameRepository.GetAll();

        var response = new GetGamesResponse(games);
        return Task.FromResult(ResponseResult.Ok(response));
    }
}
