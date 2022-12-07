using Playmate.Social.Application.ChatMessages.Responses;

namespace Playmate.Social.WebAPI.Hubs.Clients;

public interface INotificationsClient
{
    Task ReceiveChatMessage(AddChatMessageResponse request);
}
