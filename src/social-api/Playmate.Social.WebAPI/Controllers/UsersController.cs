using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Playmate.Social.Application.Users.Commands;
using Playmate.Social.Application.Users.Queries;
using Playmate.Social.WebAPI.ApiRequests.Users;

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

    [HttpPut("{userId}")]
    public async Task<IActionResult> UpdateUser([FromRoute] string userId, [FromForm] UpdateUserRequest request)
    {
        var command = new UpdateUserCommand
        {
            Username = request.Username,
            UserId = Guid.Parse(userId),
            Picture = request.Picture?.OpenReadStream(),
            PictureName = request.Picture?.FileName,
            PictureSize = request.Picture?.Length,
            PictureType = request.Picture?.ContentType
        };
        var response = await _mediator.Send(command);
        return GetStatusCode(response);
    }
}
