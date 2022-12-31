import { createListenerMiddleware, PayloadAction } from "@reduxjs/toolkit";
import { clearUserFromStorage, storeUser } from "../common/storage";
import { clearChatState } from "../slices/chatSlice";
import {
  setFriendsList,
  setFriendsListSearchPhrase,
  setSelectedFriend
} from "../slices/friendsListSlice";
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
      apiListener.dispatch(clearChatState());
      apiListener.dispatch(setFriendsList([]));
      apiListener.dispatch(setFriendsListSearchPhrase(""));
    }

    storeUser(action.payload);
  }
});
