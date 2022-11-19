import { HubConnection } from "@microsoft/signalr";
import { createListenerMiddleware, PayloadAction } from "@reduxjs/toolkit";
import {
  IUserIdentityState,
  setUserIdentity
} from "../slices/userIdentitySlice";

export const signalRListenerMiddleware = createListenerMiddleware();
const notificationsHubConnection: HubConnection | null = null;

signalRListenerMiddleware.startListening({
  actionCreator: setUserIdentity,
  effect: (action: PayloadAction<IUserIdentityState>, listenerApi) => {
    console.log(action);
  }
});
