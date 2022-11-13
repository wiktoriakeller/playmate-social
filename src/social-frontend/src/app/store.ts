import { configureStore } from "@reduxjs/toolkit";
import { friendsApi } from "../api/friends/friendsApi";
import { identityApi } from "../api/identity/identityApi";
import { usersApi } from "../api/users/usersApi";
import { themeListenerMiddleware } from "../middleware/themeListenerMiddleware";
import { userListenerMiddleware } from "../middleware/userListenerMiddleware";
import { tabSlice } from "../slices/tabSlice";
import { themeSlice } from "../slices/themeSlice";
import { userSearchSlice } from "../slices/userSearchSlice";
import { userSlice } from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [themeSlice.name]: themeSlice.reducer,
    [tabSlice.name]: tabSlice.reducer,
    [userSearchSlice.name]: userSearchSlice.reducer,
    [identityApi.reducerPath]: identityApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userListenerMiddleware.middleware)
      .concat(themeListenerMiddleware.middleware)
      .concat(identityApi.middleware)
      .concat(usersApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
