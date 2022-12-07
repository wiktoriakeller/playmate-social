using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Playmate.Social.Application.Friends.Commands;
using Playmate.Social.WebAPI.ApiRequests.Friends;
using Playmate.Social.WebAPI.HubRequests;
using Playmate.Social.WebAPI.Hubs.Clients;

namespace Playmate.Social.WebAPI.Hubs;

[Authorize]
public class NotificationsHub : Hub<INotificationsClient>
{
    public static string HubPath = "/hubs/notifications";
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public NotificationsHub(IMediator mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }

    public async Task SendChatMessage(SendChatMessageRequest request)
    {
        await Clients.User(request.ReceiverId).ReceiveChatMessage(request);
    }

    public async Task AnswerFriendRequest(AnswerRequest answerRequest)
    {
        var command = _mapper.Map<AnswerFriendRequestCommand>(answerRequest);
        var response = await _mediator.Send(command);
        
        if (response.Succeeded)
        {
            await Clients.User(answerRequest.RequesterId.ToString()).ReceiveFriendsRequestConfirmation();
        }
    }

    public async Task SendFriendRequest(AddFriendRequest request)
    {
        var command = _mapper.Map<AddFriendRequestCommand>(request);
        var response = await _mediator.Send(command);

        if (response.Succeeded)
        {
            await Clients.User(request.ReceiverId.ToString()).ReceiveFriendsRequest(response.Data.Request);
        }
    }
}
