using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Playmate.Social.WebAPI.HubRequests.ChatMessages;
using Playmate.Social.WebAPI.Hubs.Clients;

namespace Playmate.Social.WebAPI.Hubs;

[Authorize]
public class NotificationsHub : Hub<INotificationsClient>
{
    public static string HubPath = "/hubs/notifications";

    public async Task SendChatMessage(SendChatMessageRequest request)
    {
        await Clients.User(request.ReceiverId.ToString()).ReceiveChatMessage(request);
    }
}
