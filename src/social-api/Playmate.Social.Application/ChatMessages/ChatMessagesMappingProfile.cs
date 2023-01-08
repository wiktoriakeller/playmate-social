using AutoMapper;
using Playmate.Social.Application.ChatMessages.Commands;
using Playmate.Social.Application.ChatMessages.Dtos;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.ChatMessages;

internal class ChatMessagesMappingProfile : Profile
{
    public ChatMessagesMappingProfile()
    {
        CreateMap<AddChatMessageCommand, ChatMessage>();
        CreateMap<ChatMessage, ChatMessageDto>();
    }
}
