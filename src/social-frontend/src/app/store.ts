import { configureStore } from "@reduxjs/toolkit";
import { identityApi } from "../api/identity/identityApi";
import { themeListenerMiddleware } from "../middleware/themeListenerMiddleware";
import { userListenerMiddleware } from "../middleware/userListenerMiddleware";
import { tabSlice } from "../slices/tabSlice";
import { themeSlice } from "../slices/themeSlice";
import { userSlice } from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [themeSlice.name]: themeSlice.reducer,
    [tabSlice.name]: tabSlice.reducer,
    [identityApi.reducerPath]: identityApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userListenerMiddleware.middleware)
      .concat(themeListenerMiddleware.middleware)
      .concat(identityApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
