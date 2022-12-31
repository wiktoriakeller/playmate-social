using AutoMapper;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.GameResults.Dtos;
using Playmate.Social.Application.GameResults.Queries;
using Playmate.Social.Application.GameResults.Responses;

namespace Playmate.Social.Application.GameResults.Handlers;

public class GetResultsForUserQueryHandler : IHandlerWrapper<GetResultsForUserQuery, GetResultsForUserResponse>
{
    private readonly IGameResultsRepository _gamesResultsRepository;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public GetResultsForUserQueryHandler(
        IGameResultsRepository gamesResultsRepository,
        ICurrentUserService currentUserService,
        IMapper mapper)
    {
        _gamesResultsRepository = gamesResultsRepository;
        _currentUserService = currentUserService;
        _mapper = mapper;
    }

    public async Task<Response<GetResultsForUserResponse>> Handle(GetResultsForUserQuery request, CancellationToken cancellationToken)
    {
        var user = _currentUserService.CurrentUser;
        var result = _gamesResultsRepository.GetWhere(r => r.WinnerId == user.Id || r.LoserId == user.Id);

        var grouped = result
            .GroupBy(r => r.GameId).
            ToDictionary(group => group.Key, group => group.Select(gameResult => _mapper.Map<GameResultDto>(gameResult)));

        return ResponseResult.Created(new GetResultsForUserResponse(grouped));
    }
}
