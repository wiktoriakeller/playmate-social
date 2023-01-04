import { createListenerMiddleware, PayloadAction } from "@reduxjs/toolkit";
import { storeTheme } from "../common/storage";
import { IThemeState, setThemeMode } from "../slices/themeSlice";

export const themeListenerMiddleware = createListenerMiddleware();

themeListenerMiddleware.startListening({
  actionCreator: setThemeMode,
  effect: (action: PayloadAction<IThemeState>) => {
    storeTheme(action.payload.themeMode);
  }
});
