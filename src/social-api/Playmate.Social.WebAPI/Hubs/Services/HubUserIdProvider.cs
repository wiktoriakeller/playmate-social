using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace Playmate.Social.WebAPI.Hubs.Services;

public class HubUserIdProvider : IUserIdProvider
{
    public virtual string GetUserId(HubConnectionContext connection) =>
        connection.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value!;
}
