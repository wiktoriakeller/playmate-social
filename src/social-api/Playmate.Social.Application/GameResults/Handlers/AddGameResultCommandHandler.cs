using AutoMapper;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Common.Contracts.Providers;
using Playmate.Social.Application.GameResults.Commands;
using Playmate.Social.Application.GameResults.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.GameResults.Handlers;

public class AddGameResultCommandHandler : IHandlerWrapper<AddGameResultCommand, AddGameResultResponse>
{
    private readonly IRepository<GameResult> _gamesResultsRepository;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly IMapper _mapper;

    public AddGameResultCommandHandler(IRepository<GameResult> gameResultsRepository, IMapper mapper, IDateTimeProvider dateTimeProvider)
    {
        _gamesResultsRepository = gameResultsRepository;
        _dateTimeProvider = dateTimeProvider;
        _mapper = mapper;
    }

    public async Task<Response<AddGameResultResponse>> Handle(AddGameResultCommand request, CancellationToken cancellationToken)
    {
        var mappedResult = _mapper.Map<GameResult>(request);
        mappedResult.Date = _dateTimeProvider.CurrentTime;

        var created = await _gamesResultsRepository.AddAsync(mappedResult);
        return ResponseResult.Created(new AddGameResultResponse(created.Id));
    }
}
