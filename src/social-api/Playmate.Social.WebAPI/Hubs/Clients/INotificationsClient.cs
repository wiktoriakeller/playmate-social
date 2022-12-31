using Playmate.Social.Application.Friends.Dtos;
using Playmate.Social.Application.ChatMessages.Responses;
using Playmate.Social.Application.Friends.Responses;

namespace Playmate.Social.WebAPI.Hubs.Clients;

public interface INotificationsClient
{
    Task ReceiveFriendsRequest(FriendRequestDto request);
    Task ReceiveFriendsRequestConfirmation(ConfirmFriendRequestResponse confirmation);
    Task ReceiveChatMessage(AddChatMessageResponse request);
}
