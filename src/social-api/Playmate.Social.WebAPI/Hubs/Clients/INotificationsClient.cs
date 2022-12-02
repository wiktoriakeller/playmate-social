using Playmate.Social.WebAPI.HubRequests.ChatMessages;

namespace Playmate.Social.WebAPI.Hubs.Clients;

public interface INotificationsClient
{
    Task ReceiveChatMessage(SendChatMessageRequest request);
}
