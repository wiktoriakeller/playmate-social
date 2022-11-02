import { createListenerMiddleware, PayloadAction } from "@reduxjs/toolkit";
import { getUserFromStorage, storeUser } from "../common/storage";
import {
  IUserState,
  IUserTokens,
  setUser,
  setUserTokens
} from "../slices/userSlice";

export const userListenerMiddleware = createListenerMiddleware();

userListenerMiddleware.startListening({
  actionCreator: setUser,
  effect: (action: PayloadAction<IUserState>) => {
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
    apiListener.dispatch(setUser(newUser));
  }
});
