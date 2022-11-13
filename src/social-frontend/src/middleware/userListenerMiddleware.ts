import { createListenerMiddleware, PayloadAction } from "@reduxjs/toolkit";
import {
  clearUserFromStorage,
  getUserFromStorage,
  storeUser
} from "../common/storage";
import {
  IUserIdentityState,
  IUserTokens,
  setUserIdentity,
  setUserTokens
} from "../slices/userIdentitySlice";

export const userListenerMiddleware = createListenerMiddleware();

userListenerMiddleware.startListening({
  actionCreator: setUserIdentity,
  effect: (action: PayloadAction<IUserIdentityState>) => {
    if (action.payload.jwtToken === null) {
      clearUserFromStorage();
    }

    storeUser(action.payload);
  }
});

userListenerMiddleware.startListening({
  actionCreator: setUserTokens,
  effect: (action: PayloadAction<IUserTokens>, apiListener) => {
    const user = getUserFromStorage();
    const newUser = {
      ...user,
      userTokens: action.payload as IUserTokens
    };
    apiListener.dispatch(setUserIdentity(newUser));
  }
});
