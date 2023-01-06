using Playmate.Social.Application.Friends.Dtos;
using Playmate.Social.Application.ChatMessages.Responses;
using Playmate.Social.WebAPI.Hubs.Responses.FriendsRequests;

namespace Playmate.Social.WebAPI.Hubs.Clients;

public interface INotificationsClient
{
    Task ReceiveFriendsRequest(FriendRequestDto request);

    Task ReceiveFriendsRequestConfirmation(ConfirmFriendRequestResponse confirmation);

    Task ReceiveChatMessage(AddChatMessageResponse request);
}
