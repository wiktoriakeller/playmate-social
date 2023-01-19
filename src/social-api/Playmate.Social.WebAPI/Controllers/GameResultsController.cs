using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Playmate.Social.Application.GameResults.Commands;
using Playmate.Social.Application.GameResults.Queries;
using Playmate.Social.WebAPI.ApiRequests.GameResults;

namespace Playmate.Social.WebAPI.Controllers;

[Route("api/v1/game-results")]
public class GameResultsController : BaseApiController
{
    public GameResultsController(IMediator mediator, IMapper mapper) : base(mediator, mapper)
    {
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetGameResultsForUser()
    {
        var response = await _mediator.Send(new GetResultsForUserQuery());
        return GetStatusCode(response);
    }

    [HttpPost]
    public async Task<IActionResult> AddGameResult([FromBody] AddGameResultRequest request)
    {
        var command = _mapper.Map<AddGameResultCommand>(request);
        var response = await _mediator.Send(command);
        return GetStatusCode(response);
    }
}
