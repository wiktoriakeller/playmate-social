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
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly IMapper _mapper;

    public AddGameResultCommandHandler(
        IGameResultsRepository gameResultsRepository,
        IGamesRepository gamesRepository,
        IDateTimeProvider dateTimeProvider,
        IMapper mapper)
    {
        _gamesResultsRepository = gameResultsRepository;
        _gamesRepository = gamesRepository;
        _dateTimeProvider = dateTimeProvider;
        _mapper = mapper;
    }

    public async Task<Response<AddGameResultResponse>> Handle(AddGameResultCommand request, CancellationToken cancellationToken)
    {
        var mappedResult = _mapper.Map<GameResult>(request);
        mappedResult.Date = _dateTimeProvider.CurrentOffsetTimeUtc;

        var game = await _gamesRepository.GetByIdAsync(mappedResult.GameId);
        if (game == null)
        {
            return ResponseResult.ValidationError<AddGameResultResponse>("Game with the provided ID does not exist");
        }

        var created = await _gamesResultsRepository.AddAsync(mappedResult);
        return ResponseResult.Created(new AddGameResultResponse(created.Id));
    }
}
