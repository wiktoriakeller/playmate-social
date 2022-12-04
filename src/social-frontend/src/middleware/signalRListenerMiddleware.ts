import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel
} from "@microsoft/signalr";
import { createListenerMiddleware, PayloadAction } from "@reduxjs/toolkit";
import { addChatMessage, IChatMessage } from "../slices/chatSlice";
import { setFriendLastChatMessage } from "../slices/friendsListSlice";
import {
  IUserIdentityState,
  setUserIdentity
} from "../slices/userIdentitySlice";

export const signalRListenerMiddleware = createListenerMiddleware();
export const chatListenerMiddleware = createListenerMiddleware();

const baseUrl = process.env.REACT_APP_BASE_API_URL;
const notificationsHubUrl = `${baseUrl}/hubs/notifications`;
let hubConnection: HubConnection | null = null;

interface IReceiveChatMessage {
  senderId: string;
  senderUsername: string;
  receiverId: string;
  content: string;
  createdAt: string;
}

const stopHubConnection = () => {
  if (
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
};

signalRListenerMiddleware.startListening({
  actionCreator: setUserIdentity,
  effect: (action: PayloadAction<IUserIdentityState>, listenerApi) => {
    const user = action.payload;
    if (!!user?.jwtToken) {
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

      hubConnection.on("ReceiveChatMessage", (request: IReceiveChatMessage) => {
        listenerApi.dispatch(
          addChatMessage({
            ...request,
            isCurrentUserReceiver: true
          })
        );

        listenerApi.dispatch(
          setFriendLastChatMessage({
            senderId: request.senderId,
            senderUsername: request.senderUsername,
            content: request.content
          })
        );
      });

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
      stopHubConnection();
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
