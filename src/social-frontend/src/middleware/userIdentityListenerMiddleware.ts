import { createListenerMiddleware, PayloadAction } from "@reduxjs/toolkit";
import { chatMessagesApi } from "../api/chatMessages/chatMessagesApi";
import { friendsApi } from "../api/friends/friendsApi";
import { usersApi } from "../api/users/usersApi";
import { clearUserFromStorage, storeUser } from "../common/storage";
import { setSelectedFriend } from "../slices/friendsListSlice";
import {
  IUserIdentityState,
  setUserIdentity
} from "../slices/userIdentitySlice";

export const userIdentityListenerMiddleware = createListenerMiddleware();

userIdentityListenerMiddleware.startListening({
  actionCreator: setUserIdentity,
  effect: (action: PayloadAction<IUserIdentityState>, apiListener) => {
    apiListener.dispatch(friendsApi.util.invalidateTags(["friendsList"]));
    apiListener.dispatch(chatMessagesApi.util.invalidateTags(["chatMessages"]));

    if (action.payload?.jwtToken === null) {
      clearUserFromStorage();
      apiListener.dispatch(setSelectedFriend(null));
    }

    storeUser(action.payload);
  }
});
