using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Playmate.Social.Application.ChatMessages.Queries;
using Playmate.Social.WebAPI.ApiRequests.ChatMessages;

namespace Playmate.Social.WebAPI.Controllers;

[Authorize]
[Route("api/v1/chat-messages")]
public class ChatMessagesController : BaseApiController
{
    public ChatMessagesController(IMediator mediator, IMapper mapper) : base(mediator, mapper)
    {
    }

    [HttpGet]
    public async Task<IActionResult> GetChatMessages([FromQuery] GetChatMessagesListRequest request)
    {
        var query = new GetChatMessagesListQuery { FriendId = request.FriendId };
        var response = await _medaitor.Send(query);
        return GetStatusCode(response);
    }
}
