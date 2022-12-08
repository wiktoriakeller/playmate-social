import { configureStore } from "@reduxjs/toolkit";
import { chatMessagesApi } from "../api/chatMessages/chatMessagesApi";
import { friendsApi } from "../api/friends/friendsApi";
import { identityApi } from "../api/identity/identityApi";
import { usersApi } from "../api/users/usersApi";
import {
  answerFriendRequestsListenerMiddleware,
  chatListenerMiddleware,
  sendFriendRequestsListenerMiddleware,
  signalRListenerMiddleware
} from "../middleware/signalRListenerMiddleware";
import { themeListenerMiddleware } from "../middleware/themeListenerMiddleware";
import { userIdentityListenerMiddleware } from "../middleware/userIdentityListenerMiddleware";
import { chatSlice } from "../slices/chatSlice";
import { friendRequestsSlice } from "../slices/friendRequestsSlice";
import { friendsListSlice } from "../slices/friendsListSlice";
import { snackbarSlice } from "../slices/snackbarSlice";
import { tabSlice } from "../slices/tabSlice";
import { themeSlice } from "../slices/themeSlice";
import { userIdentitySlice } from "../slices/userIdentitySlice";
import { userSearchSlice } from "../slices/userSearchSlice";

export const store = configureStore({
  reducer: {
    [userIdentitySlice.name]: userIdentitySlice.reducer,
    [themeSlice.name]: themeSlice.reducer,
    [tabSlice.name]: tabSlice.reducer,
    [userSearchSlice.name]: userSearchSlice.reducer,
    [friendsListSlice.name]: friendsListSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [friendRequestsSlice.name]: friendRequestsSlice.reducer,
    [snackbarSlice.name]: snackbarSlice.reducer,
    [identityApi.reducerPath]: identityApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
    [chatMessagesApi.reducerPath]: chatMessagesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userIdentityListenerMiddleware.middleware)
      .concat(signalRListenerMiddleware.middleware)
      .concat(chatListenerMiddleware.middleware)
      .concat(sendFriendRequestsListenerMiddleware.middleware)
      .concat(answerFriendRequestsListenerMiddleware.middleware)
      .concat(themeListenerMiddleware.middleware)
      .concat(identityApi.middleware)
      .concat(usersApi.middleware)
      .concat(friendsApi.middleware)
      .concat(chatMessagesApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
