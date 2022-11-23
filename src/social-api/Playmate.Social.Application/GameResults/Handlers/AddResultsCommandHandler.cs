using AutoMapper;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.GameResults.Commands;
using Playmate.Social.Application.GameResults.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.GameResults.Handlers;

public class AddResultsCommandHandler : IHandlerWrapper<AddResultsCommand, AddResultsResponse>
{
    private readonly IRepository<GameResult> _resultsRepository;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly IMapper _mapper;

    public AddResultsCommandHandler(IRepository<GameResult> resultsRepository, IMapper mapper, IDateTimeProvider dateTimeProvider)
    {
        _resultsRepository = resultsRepository;
        _mapper = mapper;
        _dateTimeProvider = dateTimeProvider;
    }

    public async Task<Response<AddResultsResponse>> Handle(AddResultsCommand request, CancellationToken cancellationToken)
    {
        var mappedResult = _mapper.Map<GameResult>(request);

        mappedResult.Date = _dateTimeProvider.CurrentTime;

        var created = await _resultsRepository.AddAsync(mappedResult);
        return ResponseResult.Created(new AddResultsResponse(created.Id));
    }
}
