import { createListenerMiddleware, PayloadAction } from "@reduxjs/toolkit";
import { chatMessagesApi } from "../api/chatMessages/chatMessagesApi";
import { friendsApi } from "../api/friends/friendsApi";
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
import { setUserSearch } from "../slices/userSearchSlice";

export const userIdentityListenerMiddleware = createListenerMiddleware();

userIdentityListenerMiddleware.startListening({
  actionCreator: setUserIdentity,
  effect: (action: PayloadAction<IUserIdentityState>, apiListener) => {
    apiListener.dispatch(chatMessagesApi.util.invalidateTags(["chatMessages"]));
    apiListener.dispatch(friendsApi.util.invalidateTags(["friendsList"]));

    if (action.payload?.jwtToken === null) {
      clearUserFromStorage();
      apiListener.dispatch(setSelectedFriend(null));
      apiListener.dispatch(setCurrentTab(tabsDictionary[0]));
      apiListener.dispatch(clearChatState());
      apiListener.dispatch(setFriendsList([]));
      apiListener.dispatch(setFriendsListSearchPhrase(""));
      apiListener.dispatch(setUserSearch([]));
    }

    storeUser(action.payload);
  }
});
