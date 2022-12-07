using Playmate.Social.Application.Friends.Dtos;
using Playmate.Social.WebAPI.HubRequests;

namespace Playmate.Social.WebAPI.Hubs.Clients;

public interface INotificationsClient
{
    Task ReceiveChatMessage(SendChatMessageRequest request);
    Task ReceiveFriendsRequest(FriendRequestDto request);
    Task ReceiveFriendsRequestConfirmation();
}
