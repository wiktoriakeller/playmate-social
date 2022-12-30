import { createListenerMiddleware, PayloadAction } from "@reduxjs/toolkit";
import { chatMessagesApi } from "../api/chatMessages/chatMessagesApi";
import { friendsApi } from "../api/friends/friendsApi";
import { clearUserFromStorage, storeUser } from "../common/storage";
import { setSelectedFriend } from "../slices/friendsListSlice";
import { setCurrentTab, tabsDictionary } from "../slices/tabSlice";
import {
  IUserIdentityState,
  setUserIdentity
} from "../slices/userIdentitySlice";

export const userIdentityListenerMiddleware = createListenerMiddleware();

userIdentityListenerMiddleware.startListening({
  actionCreator: setUserIdentity,
  effect: (action: PayloadAction<IUserIdentityState>, apiListener) => {
    if (action.payload?.jwtToken === null) {
      clearUserFromStorage();
      apiListener.dispatch(setSelectedFriend(null));
      apiListener.dispatch(setCurrentTab(tabsDictionary[0]));
    }

    apiListener.dispatch(friendsApi.util.invalidateTags(["friendsList"]));
    apiListener.dispatch(chatMessagesApi.util.invalidateTags(["chatMessages"]));
    storeUser(action.payload);
  }
});
