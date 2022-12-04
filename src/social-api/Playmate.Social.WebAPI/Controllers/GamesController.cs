using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Playmate.Social.Application.Games.Commands;
using Playmate.Social.Application.Games.Queries;
using Playmate.Social.WebAPI.ApiRequests.Games;

namespace Playmate.Social.WebAPI.Controllers;

[Authorize]
[Route("api/v1/games")]
public class GamesController : BaseApiController
{
    public GamesController(IMediator mediator, IMapper mapper) : base(mediator, mapper)
    {
    }

    [HttpGet]
    public async Task<IActionResult> GetGamest()
    {
        var response = await _mediator.Send(new GetGamesQuery());
        return GetStatusCode(response);
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterGame([FromBody] RegisterGameRequest request)
    {
        var command = _mapper.Map<RegisterGameCommand>(request);
        var response = await _mediator.Send(command);
        return GetStatusCode(response);
    }
}
