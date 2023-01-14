using Playmate.Social.Application.ChatMessages.Responses;
using Playmate.Social.Application.Friends.Dtos;
using Playmate.Social.WebAPI.Hubs.Responses;

namespace Playmate.Social.WebAPI.Hubs.Clients;

public interface INotificationsClient
{
    Task ReceiveFriendsRequest(FriendRequestDto response);

    Task ReceiveFriendsRequestConfirmation(ConfirmFriendRequestResponse response);

    Task ReceiveChatMessage(AddChatMessageResponse response);

    Task ReceiveFriendDataUpdate(UpdateFriendDataResponse response);

    Task ReceiveUserOnlineStatus(UpdateUserOnlineStatusResponse response);

    Task ReceiveOnlineUsersList(GetOnlineUsersResponse response);
}
