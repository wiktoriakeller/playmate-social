import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel
} from "@microsoft/signalr";
import { createListenerMiddleware, PayloadAction } from "@reduxjs/toolkit";
import { friendsApi } from "../api/friends/friendsApi";
import { IFriendRequestConfirmationResponse } from "../api/friends/responses/friendsRequestConfirmation";
import { IUserSearchItem } from "../api/users/responses/searchUsersResponse";
import { RootState } from "../app/store";
import { addChatMessage, IChatMessage } from "../slices/chatSlice";
import {
  addFriendRequest,
  answerFriendRequests,
  IFriendRequest,
  IFriendRequestConfirmation
} from "../slices/friendRequestsSlice";
import {
  addFriend,
  IFriend,
  IUpdateFriendData,
  setFriendLastChatMessage,
  setFriendsList,
  updateFriendData,
  updateSelectedFriend
} from "../slices/friendsListSlice";
import {
  addUserToOnlineList,
  setOnlineUsers
} from "../slices/onlineUsersSlice";
import {
  IUserIdentityState,
  setUserIdentity
} from "../slices/userIdentitySlice";
import { sendFriendRequest } from "../slices/userSearchSlice";

export const signalRListenerMiddleware = createListenerMiddleware();
export const chatListenerMiddleware = createListenerMiddleware();
export const sendFriendRequestListenerMiddleware = createListenerMiddleware();
export const friendsListListenerMiddleware = createListenerMiddleware();
export const answerFriendRequestsListenerMiddleware =
  createListenerMiddleware();

const baseUrl = process.env.REACT_APP_BASE_API_URL;
const notificationsHubUrl = `${baseUrl}/hubs/notifications`;
let hubConnection: HubConnection | null = null;

export interface IReceiveChatMessage {
  senderId: string;
  senderUsername: string;
  receiverId: string;
  content: string;
  createdAt: string;
  joinGameUrl: string;
}

const stopHubConnection = () => {
  if (
    !!hubConnection &&
    hubConnection.state !== HubConnectionState.Disconnected
  ) {
    hubConnection
      .stop()
      .then(() => {
        console.log("Closed hub connection");
      })
      .catch((error) => {
        console.error("Error while closing hub connection: ", error);
      });
  }
};

signalRListenerMiddleware.startListening({
  actionCreator: setUserIdentity,
  effect: (action: PayloadAction<IUserIdentityState>, listenerApi) => {
    const user = action.payload;
    if (user?.jwtToken !== null) {
      stopHubConnection();

      hubConnection = new HubConnectionBuilder()
        .withUrl(notificationsHubUrl, {
          accessTokenFactory: () => user.jwtToken
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      hubConnection.onclose((error) => {
        console.assert(hubConnection.state === HubConnectionState.Disconnected);
        console.log("Connection closed due to an error.", error);
      });

      hubConnection.onreconnecting((error) => {
        console.assert(hubConnection.state === HubConnectionState.Reconnecting);
        console.log("Connection lost due to an error. Reconnecting.", error);
      });

      hubConnection.onreconnected((connectionId) => {
        console.assert(hubConnection.state === HubConnectionState.Connected);
        console.log(
          "Connection reestablished. Connected with connectionId: ",
          connectionId
        );
      });

      hubConnection.on("ReceiveChatMessage", (request: IReceiveChatMessage) => {
        listenerApi.dispatch(
          addChatMessage({
            ...request,
            isCurrentUserReceiver: true
          })
        );

        listenerApi.dispatch(
          setFriendLastChatMessage({
            friendId: request.senderId,
            senderId: request.senderId,
            senderUsername: request.senderUsername,
            content: request.content
          })
        );
      });

      hubConnection.on("ReceiveFriendsRequest", (request: IFriendRequest) => {
        listenerApi.dispatch(addFriendRequest(request));
      });

      hubConnection.on(
        "ReceiveFriendsRequestConfirmation",
        (request: IFriendRequestConfirmationResponse) => {
          listenerApi.dispatch(addFriend(request.createdFriend));
          listenerApi.dispatch(friendsApi.util.invalidateTags(["friendsList"]));
        }
      );

      hubConnection.on(
        "ReceiveFriendDataUpdate",
        (request: IUpdateFriendData) => {
          listenerApi.dispatch(updateFriendData(request));
          listenerApi.dispatch(updateSelectedFriend(request));
          listenerApi.dispatch(friendsApi.util.invalidateTags(["friendsList"]));
        }
      );

      hubConnection.on(
        "ReceiveOnlineUsersList",
        (request: { userIds: string[] }) => {
          listenerApi.dispatch(setOnlineUsers(request.userIds));
        }
      );

      hubConnection.on(
        "ReceiveUserOnlineStatus",
        (request: { userId: string; isOnline: boolean }) => {
          listenerApi.dispatch(addUserToOnlineList(request));
        }
      );

      hubConnection
        .start()
        .then(() => {
          console.assert(hubConnection.state === HubConnectionState.Connected);
          console.log("SignalR connection established");
        })
        .catch((error) => {
          console.assert(
            hubConnection.state === HubConnectionState.Disconnected
          );
          console.error("SignalR connection Error: ", error);
        });
    } else if (
      !!hubConnection &&
      hubConnection.state !== HubConnectionState.Disconnected
    ) {
      stopHubConnection();
    }
  }
});

const getFriendsListWithNewestMessageAtTheTop = (
  state: RootState,
  isCurrentUserReceiver: boolean,
  senderId: string,
  receiverId: string
): IFriend[] => {
  const friendsList = state.friendsList.friends;
  const friendToMoveId = isCurrentUserReceiver ? senderId : receiverId;
  const friendToMove = friendsList.filter((x) => x.id === friendToMoveId)[0];

  return [friendToMove, ...friendsList.filter((x) => x.id !== friendToMoveId)];
};

const isConnectionReady = () =>
  !!hubConnection && hubConnection.state === "Connected";

chatListenerMiddleware.startListening({
  actionCreator: addChatMessage,
  effect: (action: PayloadAction<IChatMessage>, apiListener) => {
    if (isConnectionReady()) {
      if (!action.payload.isCurrentUserReceiver) {
        hubConnection.send("SendChatMessage", action.payload).catch((error) => {
          console.error("Error while sending chat message: ", error);
        });
      }

      const currentState = apiListener.getState() as RootState;
      const newList = getFriendsListWithNewestMessageAtTheTop(
        currentState,
        action.payload.isCurrentUserReceiver,
        action.payload.senderId,
        action.payload.receiverId
      );

      apiListener.dispatch(setFriendsList(newList));
      apiListener.dispatch(friendsApi.util.invalidateTags(["friendsList"]));
    }
  }
});

sendFriendRequestListenerMiddleware.startListening({
  actionCreator: sendFriendRequest,
  effect: (action: PayloadAction<IUserSearchItem>) => {
    if (isConnectionReady()) {
      hubConnection
        .send("SendFriendRequest", {
          username: action.payload.username,
          receiverId: action.payload.id
        })
        .catch((error) => {
          console.error("Error while sending friend request: ", error);
        });
    }
  }
});

answerFriendRequestsListenerMiddleware.startListening({
  actionCreator: answerFriendRequests,
  effect: (action: PayloadAction<IFriendRequestConfirmation>) => {
    if (isConnectionReady()) {
      hubConnection
        .send("AnswerFriendRequest", action.payload)
        .catch((error) => {
          console.error("Error while answering friend request: ", error);
        });
    }
  }
});

friendsListListenerMiddleware.startListening({
  predicate: (action) => {
    return addFriend.match(action) || setFriendsList.match(action);
  },
  effect: () => {
    if (isConnectionReady()) {
      hubConnection.send("GetOnlineUsers").catch((error) => {
        console.error("Error while fetching online users: ", error);
      });
    }
  }
});
