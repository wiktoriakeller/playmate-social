using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Playmate.Social.Application.ChatMessages.Commands;
using Playmate.Social.Application.ChatMessages.Queries;
using Playmate.Social.WebAPI.HubRequests.ChatMessages;

namespace Playmate.Social.WebAPI.Controllers;

[Route("chat")]
public class ChatMessagesController : BaseApiController
{
    public ChatMessagesController(IMediator mediator, IMapper mapper) : base(mediator, mapper)
    {
    }

    [HttpGet]
    public async Task<IActionResult> GetChatMessages([FromQuery] GetChatMessagesListRequest request)
    {
        var query = new GetChatMessagesListQuery { FirstUserId = request.FirstUserId, SecondUserId = request.SecondUserId };
        var response = await _medaitor.Send(query);
        return GetStatusCode(response);
    }

    [HttpPost]
    public async Task<IActionResult> AddChatMessage([FromBody] SendChatMessageRequest request)
    {
        var command = _mapper.Map<AddChatMessageCommand>(request);
        var response = await _medaitor.Send(command);
        return GetStatusCode(response);
    }
}
