import { createListenerMiddleware, PayloadAction } from "@reduxjs/toolkit";
import { getUserFromStorage } from "../common/storage";
import {
  IUserState,
  IUserTokens,
  setUser,
  setUserTokens
} from "../slices/userSlice";

export const userListenerMiddleware = createListenerMiddleware();

userListenerMiddleware.startListening({
  actionCreator: setUser,
  effect: (action: PayloadAction<IUserState>, listenerApi) => {
    setUser(action.payload);
  }
});

userListenerMiddleware.startListening({
  actionCreator: setUserTokens,
  effect: (action: PayloadAction<IUserTokens>, listenerApi) => {
    const user = getUserFromStorage();
    setUser({
      ...user,
      userTokens: action.payload as IUserTokens
    });
  }
});
