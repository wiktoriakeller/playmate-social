import { configureStore } from "@reduxjs/toolkit";
import { friendsApi } from "../api/friends/friendsApi";
import { gameIntegrationApi } from "../api/games/gameIntegrationApi";
import { gamesApi } from "../api/games/gamesApi";
import { identityApi } from "../api/identity/identityApi";
import { usersApi } from "../api/users/usersApi";
import { themeListenerMiddleware } from "../middleware/themeListenerMiddleware";
import { userListenerMiddleware } from "../middleware/userListenerMiddleware";
import { chatSlice } from "../slices/chatSlice";
import { friendsListSlice } from "../slices/friendsListSlice";
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
    [identityApi.reducerPath]: identityApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
    [gameIntegrationApi.reducerPath]: gameIntegrationApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userListenerMiddleware.middleware)
      .concat(themeListenerMiddleware.middleware)
      .concat(identityApi.middleware)
      .concat(usersApi.middleware)
      .concat(friendsApi.middleware)
      .concat(gamesApi.middleware)
      .concat(gameIntegrationApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
