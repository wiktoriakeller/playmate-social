using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.WebAPI.Controllers;

[Route("chat")]
public class ChatMessagesController : BaseApiController
{
    private readonly IChatMessagesRepository _chatMessagesRepository;

    public ChatMessagesController(IMediator mediator, IMapper mapper, IChatMessagesRepository chatMessagesRepository) : base(mediator, mapper)
    {
        _chatMessagesRepository = chatMessagesRepository;
    }

    [HttpPost]
    public async Task<IActionResult> AddChatMessage(ChatMessage chatMessage)
    {
        await _chatMessagesRepository.AddChatMessage(chatMessage);
        return Ok(await _chatMessagesRepository.GetChatMessagesForRoomId(chatMessage.ChatRoomId));
    }
}
