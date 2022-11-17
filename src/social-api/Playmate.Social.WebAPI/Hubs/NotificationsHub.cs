using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Playmate.Social.WebAPI.HubRequests;
using Playmate.Social.WebAPI.Hubs.Clients;

namespace Playmate.Social.WebAPI.Hubs;

[Authorize]
public class NotificationsHub : Hub<INotificationsClient>
{
    public static string HubPath = "/hubs/notifications";

    public async Task SendChatMessage(SendChatMessageRequest request)
    {
        await Clients.User(request.ReceiverId).ReceiveChatMessage(request);
    }
}
