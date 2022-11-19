import { createListenerMiddleware, PayloadAction } from "@reduxjs/toolkit";
import { clearUserFromStorage, storeUser } from "../common/storage";
import {
  IUserIdentityState,
  setUserIdentity
} from "../slices/userIdentitySlice";

export const userIdentityListenerMiddleware = createListenerMiddleware();

userIdentityListenerMiddleware.startListening({
  actionCreator: setUserIdentity,
  effect: (action: PayloadAction<IUserIdentityState>) => {
    if (action.payload.jwtToken === null) {
      clearUserFromStorage();
    }

    storeUser(action.payload);
  }
});
