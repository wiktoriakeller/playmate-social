using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Playmate.Social.Application.ChatMessages.Commands;
using Playmate.Social.WebAPI.HubRequests.ChatMessages;
using Playmate.Social.WebAPI.Hubs.Clients;

namespace Playmate.Social.WebAPI.Hubs;

[Authorize]
public class NotificationsHub : Hub<INotificationsClient>
{
    public static string HubPath = "/hubs/notifications";

    protected readonly IMediator _medaitor;
    protected readonly IMapper _mapper;

    public NotificationsHub(IMediator mediator, IMapper mapper)
    {
        _medaitor = mediator;
        _mapper = mapper;
    }

    public async Task SendChatMessage(SendChatMessageRequest request)
    {
        var command = _mapper.Map<AddChatMessageCommand>(request);
        var response = await _medaitor.Send(command);

        if (response.Succeeded)
        {
            await Clients.User(request.ReceiverId.ToString()).ReceiveChatMessage(request);
        }
    }
}
