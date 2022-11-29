using AutoMapper;
using Playmate.Social.Application.ChatMessages.Commands;
using Playmate.Social.WebAPI.HubRequests.ChatMessages;

namespace Playmate.Social.WebAPI.HubRequests.Mappings;

public class ChatMessagesMappingProfile : Profile
{
    public ChatMessagesMappingProfile()
    {
        CreateMap<SendChatMessageRequest, AddChatMessageCommand>();
    }
}
