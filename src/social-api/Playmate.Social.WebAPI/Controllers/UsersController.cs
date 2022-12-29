using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Playmate.Social.Application.Identity.Queries;

namespace Playmate.Social.WebAPI.Controllers;

[Authorize]
[Route("api/v1/users")]
public class UsersController : BaseApiController
{
    public UsersController(IMediator mediator, IMapper mapper) : base(mediator, mapper)
    {
    }

    [HttpGet("{username}")]
    public async Task<IActionResult> GetUsersByUsername([FromRoute] string username)
    {
        var query = new GetUsersByUsernameQuery() { Username = username };
        var response = await _mediator.Send(query);
        return GetStatusCode(response);
    }
}
