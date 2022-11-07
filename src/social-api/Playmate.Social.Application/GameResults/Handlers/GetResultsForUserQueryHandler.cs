using AutoMapper;
using MediatR;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.GameResults.Queries;
using Playmate.Social.Application.GameResults.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.GameResults.Handlers;

public class GetResultsForUserQueryHandler : IHandlerWrapper<GetResultsForUserQuery, GetResultsForUserResponse>
{
    private readonly IRepository<GameResult> _resultsRepository;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _userService;

    public GetResultsForUserQueryHandler(IRepository<GameResult> resultsRepository, IMapper mapper, ICurrentUserService userService)
    {
        _resultsRepository = resultsRepository;
        _mapper = mapper;
        _userService = userService;
    }

    public async Task<Response<GetResultsForUserResponse>> Handle(GetResultsForUserQuery request, CancellationToken cancellationToken)
    {
        var user = _userService.CurrentUser;
        var result = _resultsRepository
            .GetWhere(r => r.WinnerId == user.Id || r.LoserId == user.Id)
            .GroupBy(r => r.GameId)
            .SelectMany(group => group)
            .ToList();

        return ResponseResult.Created(new GetResultsForUserResponse());
    }
}
