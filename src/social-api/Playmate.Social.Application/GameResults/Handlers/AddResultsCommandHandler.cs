using AutoMapper;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Friends.Responses;
using Playmate.Social.Application.GameResults.Commands;
using Playmate.Social.Application.GameResults.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.GameResults.Handlers;

public class AddResultsCommandHandler : IHandlerWrapper<AddResultsCommand, AddResultsResponse>
{
    private readonly IRepository<GameResult> _resultsRepository;
    private readonly IMapper _mapper;

    public AddResultsCommandHandler(IRepository<GameResult> resultsRepository, IMapper mapper)
    {
        _resultsRepository = resultsRepository;
        _mapper = mapper;
    }

    public async Task<Response<AddResultsResponse>> Handle(AddResultsCommand request, CancellationToken cancellationToken)
    {
        var mappedResult = _mapper.Map<GameResult>(request);

        mappedResult.Date = DateTime.Now;

        var created = await _resultsRepository.AddAsync(mappedResult);
        return ResponseResult.Created(new AddResultsResponse(created.Id));
    }
}
