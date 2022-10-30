import { configureStore } from "@reduxjs/toolkit";
import { identityApi } from "../api/identity/identityApi";
import { userListenerMiddleware } from "../api/userListenerMiddleware";
import { userSlice } from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [identityApi.reducerPath]: identityApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(userListenerMiddleware.middleware)
      .prepend(identityApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
