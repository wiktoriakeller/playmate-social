using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Playmate.Social.Application.ChatMessages.Commands;
using Playmate.Social.Application.Friends.Commands;
using Playmate.Social.WebAPI.ApiRequests.Friends;
using Playmate.Social.WebAPI.Hubs.Clients;
using Playmate.Social.WebAPI.Hubs.Requests;
using Playmate.Social.WebAPI.Hubs.Responses;

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
        var command = _mapper.Map<AddChatMessageCommand>(request);
        var response = await _mediator.Send(command);

        if (response.Succeeded)
        {
            await Clients.User(request.ReceiverId.ToString()).ReceiveChatMessage(response.Data!);
        }
    }

    public async Task AnswerFriendRequest(ConfirmFriendRequest confirmRequest)
    {
        var command = _mapper.Map<ConfirmFriendRequestCommand>(confirmRequest);
        var response = await _mediator.Send(command);

        if (response.Succeeded && response.Data?.RequestAccepted == true)
        {
            await Clients.User(confirmRequest.RequesterId.ToString()).ReceiveFriendsRequestConfirmation(new ConfirmFriendRequestResponse
            {
                CreatedFriend = response.Data.CreatedFriend,
            });

            await Clients.User(response.Data.CreatedFriend.Id.ToString()).ReceiveFriendsRequestConfirmation(new ConfirmFriendRequestResponse
            {
                CreatedFriend = response.Data.RequestFrom
            });
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
