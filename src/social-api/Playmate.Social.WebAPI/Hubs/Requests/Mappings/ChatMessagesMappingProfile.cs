using AutoMapper;
using Playmate.Social.Application.ChatMessages.Commands;

namespace Playmate.Social.WebAPI.Hubs.Requests.Mappings;

public class ChatMessagesMappingProfile : Profile
{
    public ChatMessagesMappingProfile()
    {
        CreateMap<SendChatMessageRequest, AddChatMessageCommand>();
    }
}
