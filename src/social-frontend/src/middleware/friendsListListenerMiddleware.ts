import { createListenerMiddleware } from "@reduxjs/toolkit";
import { friendsApi } from "../api/friends/friendsApi";
import { addFriend } from "../slices/friendsListSlice";
import { usersApi } from "../api/users/usersApi";

export const friendsListListenerMiddleware = createListenerMiddleware();

friendsListListenerMiddleware.startListening({
  actionCreator: addFriend,
  effect: (_, apiListener) => {
    apiListener.dispatch(friendsApi.util.invalidateTags(["friendsList"]));
  }
});
