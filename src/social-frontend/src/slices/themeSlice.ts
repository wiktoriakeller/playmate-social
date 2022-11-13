import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { getThemeFromStore } from "../common/storage";

export type ThemeType = "light" | "dark";

export interface IThemeState {
  theme: ThemeType;
};

const themeInitialState: IThemeState = {
  theme: getThemeFromStore() ?? "dark"
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: themeInitialState,
  reducers: {
    setTheme(state: IThemeState, action: PayloadAction<IThemeState>) {
      state.theme = action.payload.theme;
    }
  }
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState): IThemeState => state.theme;

export default themeSlice.reducer;
