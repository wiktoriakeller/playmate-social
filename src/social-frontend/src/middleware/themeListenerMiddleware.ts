import { createListenerMiddleware, PayloadAction } from "@reduxjs/toolkit";
import { storeTheme } from "../common/storage";
import { IThemeState, setTheme } from "../slices/themeSlice";

export const themeListenerMiddleware = createListenerMiddleware();

themeListenerMiddleware.startListening({
  actionCreator: setTheme,
  effect: (action: PayloadAction<IThemeState>) => {
    storeTheme(action.payload.theme);
  }
});
