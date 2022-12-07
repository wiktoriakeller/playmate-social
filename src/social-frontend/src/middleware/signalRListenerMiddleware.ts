import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel
} from "@microsoft/signalr";
import { createListenerMiddleware, PayloadAction } from "@reduxjs/toolkit";
import { IFriendRequestConfirmationResponse } from "../api/friends/responses/friendsRequestConfirmation";
import { IUserSearchItem } from "../api/users/responses/searchUsersResponse";
import { addChatMessage, IChatMessage } from "../slices/chatSlice";
import {
  addFriendRequest,
  answerFriendRequests,
  IFriendRequest,
  IFriendRequestConfirmation
} from "../slices/friendRequestsSlice";
import { addFriend } from "../slices/friendsListSlice";
import {
  IUserIdentityState,
  setUserIdentity
} from "../slices/userIdentitySlice";
import { sendFriendRequest } from "../slices/userSearchSlice";

export const signalRListenerMiddleware = createListenerMiddleware();
export const chatListenerMiddleware = createListenerMiddleware();
export const sendFriendRequestsListenerMiddleware = createListenerMiddleware();
export const answerFriendRequestsListenerMiddleware =
  createListenerMiddleware();

const baseUrl = process.env.REACT_APP_BASE_API_URL;
const notificationsHubUrl = `${baseUrl}/hubs/notifications`;
let hubConnection: HubConnection | null = null;

interface IHubChatMessage {
  senderId: string;
  receiverId: string;
  message: string;
}

signalRListenerMiddleware.startListening({
  actionCreator: setUserIdentity,
  effect: (action: PayloadAction<IUserIdentityState>, listenerApi) => {
    const user = action.payload;
    if (!!user.jwtToken) {
      hubConnection = new HubConnectionBuilder()
        .withUrl(notificationsHubUrl, {
          accessTokenFactory: () => user.jwtToken
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      hubConnection.onclose((error) => {
        console.assert(hubConnection.state === HubConnectionState.Disconnected);
        console.log("Connection closed due to error.", error);
      });

      hubConnection.onreconnecting((error) => {
        console.assert(hubConnection.state === HubConnectionState.Reconnecting);
        console.log("Connection lost due to error. Reconnecting.", error);
      });

      hubConnection.onreconnected((connectionId) => {
        console.assert(hubConnection.state === HubConnectionState.Connected);
        console.log(
          "Connection reestablished. Connected with connectionId",
          connectionId
        );
      });

      hubConnection.on("ReceiveChatMessage", (request: IHubChatMessage) => {
        listenerApi.dispatch(
          addChatMessage({
            ...request,
            isCurrentUserReceiver: true
          })
        );
      });

      hubConnection.on("ReceiveFriendsRequest", (request: IFriendRequest) => {
        listenerApi.dispatch(addFriendRequest(request));
      });

      hubConnection.on(
        "ReceiveFriendsRequestConfirmation",
        (request: IFriendRequestConfirmationResponse) => {
          console.log(request);
          if (request.requestAccepted) {
            listenerApi.dispatch(addFriend(request.createdFriend));
          }
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
          console.error("SignalR Connection Error: ", error);
        });
    } else if (
      !!hubConnection &&
      hubConnection.state !== HubConnectionState.Disconnected
    ) {
      hubConnection
        .stop()
        .then(() => {
          console.log("Closed hub connection, user logout");
        })
        .catch((error) => {
          console.error("Error while closing hub connection: ", error);
        });
    }
  }
});

chatListenerMiddleware.startListening({
  actionCreator: addChatMessage,
  effect: (action: PayloadAction<IChatMessage>) => {
    if (!action.payload.isCurrentUserReceiver) {
      hubConnection.send("SendChatMessage", action.payload).catch((error) => {
        console.error("Error while sending chat message: ", error);
      });
    }
  }
});

sendFriendRequestsListenerMiddleware.startListening({
  actionCreator: sendFriendRequest,
  effect: (action: PayloadAction<IUserSearchItem>) => {
    hubConnection
      .send("SendFriendRequest", {
        username: action.payload.username,
        receiverId: action.payload.id
      })
      .catch((error) => {
        console.error("Error while sending friend request: ", error);
      });
  }
});

answerFriendRequestsListenerMiddleware.startListening({
  actionCreator: answerFriendRequests,
  effect: (action: PayloadAction<IFriendRequestConfirmation>) => {
    hubConnection.send("AnswerFriendRequest", action.payload).catch((error) => {
      console.error("Error while answering friend request: ", error);
    });
  }
});
