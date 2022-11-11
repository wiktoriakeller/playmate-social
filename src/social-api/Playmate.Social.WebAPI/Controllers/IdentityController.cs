using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Playmate.Social.Application.Identity.Commands;
using Playmate.Social.Application.Identity.Queries;
using Playmate.Social.WebAPI.Requests.Users;

namespace Playmate.Social.WebAPI.Controllers;

[Route("api/v1/identity")]
public class IdentityController : BaseApiController
{
    public IdentityController(IMediator mediator, IMapper mapper) : base(mediator, mapper)
    {
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] CreateUserRequest request)
    {
        var command = _mapper.Map<CreateUserCommand>(request);
        var response = await _medaitor.Send(command);

        if (!response.Succeeded)
        {
            return GetStatusCode(response);
        }

        return Created($"api/v1/identity/{response.Data?.Id}", response);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AuthenticateUserRequest request)
    {
        var command = _mapper.Map<AuthenticateUserCommand>(request);
        var response = await _medaitor.Send(command);
        return GetStatusCode(response);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        var command = _mapper.Map<RefreshTokenCommand>(request);
        var response = await _medaitor.Send(command);
        return GetStatusCode(response);
    }

    [Authorize]
    [HttpGet("search/{username}")]
    public async Task<IActionResult> GetUsersByUsername([FromRoute] string username)
    {
        var query = new GetUsersByUsernameQuery() { Username = username };
        var response = await _medaitor.Send(query);
        return GetStatusCode(response);
    }
}
