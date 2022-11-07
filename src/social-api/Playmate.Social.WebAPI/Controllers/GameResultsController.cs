using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Playmate.Social.Application.GameResults.Commands;
using Playmate.Social.Application.GameResults.Queries;
using Playmate.Social.WebAPI.Requests.GameResults;

namespace Playmate.Social.WebAPI.Controllers;

[Route("api/v1/Results")]
public class GameResultsController : BaseApiController
{
    public GameResultsController(IMediator mediator, IMapper mapper) : base(mediator, mapper)
    {
    }

    [HttpGet]
    public async Task<IActionResult> GetResultsForUser()
    {
        var response = await _medaitor.Send(new GetResultsForUserQuery());
        return GetStatusCode(response);
    }

    [HttpPost]
    public async Task<IActionResult> AddGameResult([FromBody] AddGameResultRequest request)
    {
        var command = _mapper.Map<AddResultsCommand>(request);
        var response = await _medaitor.Send(command);
        return GetStatusCode(response);
    }
}
