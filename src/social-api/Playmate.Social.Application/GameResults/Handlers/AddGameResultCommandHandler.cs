using AutoMapper;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Common.Contracts.Services;
using Playmate.Social.Application.GameResults.Commands;
using Playmate.Social.Application.GameResults.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.GameResults.Handlers;

public class AddGameResultCommandHandler : IHandlerWrapper<AddGameResultCommand, AddGameResultResponse>
{
    private readonly IGameResultsRepository _gamesResultsRepository;
    private readonly IGamesRepository _gamesRepository;
    private readonly IUsersRepository _usersRepository;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly IMapper _mapper;

    private const string GameNotFound = "Game with the provided ID does not exist";
    private const string WinnerNotFound = "Winner with the provided ID does not exist";
    private const string LoserNotFound = "Loser with the provided ID does not exist";

    public AddGameResultCommandHandler(
        IGameResultsRepository gameResultsRepository,
        IGamesRepository gamesRepository,
        IUsersRepository usersRepository,
        IDateTimeProvider dateTimeProvider,
        IMapper mapper)
    {
        _gamesResultsRepository = gameResultsRepository;
        _gamesRepository = gamesRepository;
        _dateTimeProvider = dateTimeProvider;
        _usersRepository = usersRepository;
        _mapper = mapper;
    }

    public async Task<Response<AddGameResultResponse>> Handle(AddGameResultCommand request, CancellationToken cancellationToken)
    {
        var game = _gamesRepository.GetByIdAsync(request.GameId);
        var winner = _usersRepository.GetByIdAsync(request.WinnerId);
        var loser = _usersRepository.GetByIdAsync(request.LoserId);

        if (await game is null)
        {
            return ResponseResult.ValidationError<AddGameResultResponse>(GameNotFound);
        }

        if(await winner is null)
        {
            return ResponseResult.ValidationError<AddGameResultResponse>(WinnerNotFound);
        }

        if (await loser is null)
        {
            return ResponseResult.ValidationError<AddGameResultResponse>(LoserNotFound);
        }

        var mappedResult = _mapper.Map<GameResult>(request);
        mappedResult.Date = _dateTimeProvider.CurrentOffsetTimeUtc;

        var created = await _gamesResultsRepository.AddAsync(mappedResult);
        return ResponseResult.Created(new AddGameResultResponse(created.Id));
    }
}
