using MediatR;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Playmate.Social.Application.Identity.Commands;
using Playmate.Social.Application.Dtos.Requests;

namespace Playmate.Social.WebAPI.Controllers
{
    [Route("api/v1/identity")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        private readonly IMediator _medaitor;
        private readonly IMapper _mapper;

        public IdentityController(IMediator mediator, IMapper mapper)
        {
            _medaitor = mediator;
            _mapper = mapper;
        }

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromBody] CreateUserRequest request)
        {
            var command = _mapper.Map<CreateUserCommand>(request);
            var response = await _medaitor.Send(command);

            if (!response.Succeeded)
            {
                return BadRequest(response);
            }

            return Created($"api/v1/identity/{response.Value.UserId}", null);
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Login([FromBody] AuthenticateUserRequest request)
        {
            var command = _mapper.Map<AuthenticateUserCommand>(request);
            var response = await _medaitor.Send(command);

            if (!response.Succeeded)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost("refresh")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var command = _mapper.Map<RefreshTokenCommand>(request);
            var response = await _medaitor.Send(command);

            if (!response.Succeeded)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }
    }
}