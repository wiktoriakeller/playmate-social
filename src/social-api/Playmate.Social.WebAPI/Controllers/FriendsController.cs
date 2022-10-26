using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Playmate.Social.Application.Friends.Commands;
using Playmate.Social.Application.Friends.Queries;
using Playmate.Social.WebAPI.Requests.Friends;

namespace Playmate.Social.WebAPI.Controllers;

[Authorize]
[Route("api/v1/friends")]
public class FriendsController : BaseApiController
{
    public FriendsController(IMediator mediator, IMapper mapper) : base(mediator, mapper)
    {
    }

    [HttpGet]
    public async Task<IActionResult> GetFriendsList()
    {
        var response = await _medaitor.Send(new GetFriendsListQuery());
        return GetStatusCode(response);
    }

    [HttpPost]
    public async Task<IActionResult> SendFriendRequest([FromBody] AddFriendRequest addFriendRequest)
    {
        var command = _mapper.Map<AddFriendRequestCommand>(addFriendRequest);
        var response = await _medaitor.Send(command);
        return GetStatusCode(response);
    }
    
    [HttpPost("answer")]
    public async Task<IActionResult> AnswerFriendRequest([FromBody] AnswerRequest answerRequest)
    {
        var command = _mapper.Map<AnswerFriendRequestCommand>(answerRequest);
        var response = await _medaitor.Send(command);
        return GetStatusCode(response);
    }


    [HttpDelete]
    public async Task<IActionResult> RemoveFriend([FromBody] RemoveFriendRequest removeFriendRequest)
    {
        var command = _mapper.Map<RemoveFriendCommand>(removeFriendRequest);
        var response = await _medaitor.Send(command);
        return GetStatusCode(response);
    }
}
