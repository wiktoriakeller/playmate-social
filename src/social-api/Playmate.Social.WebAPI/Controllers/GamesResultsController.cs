using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Playmate.Social.Application.GameResults.Commands;
using Playmate.Social.Application.GameResults.Queries;
using Playmate.Social.WebAPI.ApiRequests.GameResults;

namespace Playmate.Social.WebAPI.Controllers;

[Route("api/v1/results")]
public class GamesResultsController : BaseApiController
{
    public GamesResultsController(IMediator mediator, IMapper mapper) : base(mediator, mapper)
    {
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetGameResultsForUser()
    {
        var response = await _medaitor.Send(new GetResultsForUserQuery());
        return GetStatusCode(response);
    }

    [HttpPost]
    public async Task<IActionResult> AddGameResult([FromBody] AddGameResultRequest request)
    {
        var command = _mapper.Map<AddGameResultCommand>(request);
        var response = await _medaitor.Send(command);
        return GetStatusCode(response);
    }
}
