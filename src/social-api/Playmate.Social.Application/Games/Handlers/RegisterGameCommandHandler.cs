using AutoMapper;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Games.Commands;
using Playmate.Social.Application.Games.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Games.Handlers;

public class RegisterGameCommandHandler : IHandlerWrapper<RegisterGameCommand, RegisterGameResponse>
{
    private readonly IRepository<Game> _gamesRepository;
    private readonly IMapper _mapper;

    public RegisterGameCommandHandler(IRepository<Game> gamesRepository, IMapper mapper)
    {
        _gamesRepository = gamesRepository;
        _mapper = mapper;
    }

    public async Task<Response<RegisterGameResponse>> Handle(RegisterGameCommand request, CancellationToken cancellationToken)
    {
        var game = _mapper.Map<Game>(request);

        if (game == null)
        {
            return ResponseResult.ValidationError<RegisterGameResponse>("Could not register game");
        }

        var createGame = await _gamesRepository.AddAsync(game);

        if (createGame == null)
        {
            return ResponseResult.ValidationError<RegisterGameResponse>("Could not register game");
        }

        return ResponseResult.Created(new RegisterGameResponse(createGame.Id));
    }
}
