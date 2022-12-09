using Playmate.Social.Application.Friends.Dtos;
using Playmate.Social.WebAPI.HubRequests;
using Playmate.Social.Application.ChatMessages.Responses;

namespace Playmate.Social.WebAPI.Hubs.Clients;

public interface INotificationsClient
{
    Task ReceiveFriendsRequest(FriendRequestDto request);
    Task ReceiveFriendsRequestConfirmation();
    Task ReceiveChatMessage(AddChatMessageResponse request);
}
