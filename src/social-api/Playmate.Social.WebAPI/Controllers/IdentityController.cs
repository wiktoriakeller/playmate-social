using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Playmate.Social.Application.Identity.Commands;
using Playmate.Social.WebAPI.ApiRequests.Identity;

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
        var response = await _mediator.Send(command);

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
        var response = await _mediator.Send(command);
        return GetStatusCode(response);
    }

    [HttpPost("external-login")]
    public async Task<IActionResult> ExternalLogin([FromBody] AuthenticateExternalUserRequest request)
    {
        var command = _mapper.Map<AuthenticateExternalUserCommand>(request);
        var response = await _mediator.Send(command);
        return GetStatusCode(response);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        var command = _mapper.Map<RefreshTokenCommand>(request);
        var response = await _mediator.Send(command);
        return GetStatusCode(response);
    }
}
