import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { getThemeFromStorage } from "../common/storage";

export type ThemeModeType = "light" | "dark";

export interface IThemeState {
  themeMode: ThemeModeType;
}

const themeInitialState: IThemeState = {
  themeMode: getThemeFromStorage() ?? "dark"
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: themeInitialState,
  reducers: {
    setThemeMode(state: IThemeState, action: PayloadAction<IThemeState>) {
      state.themeMode = action.payload.themeMode;
    }
  }
});

export const { setThemeMode } = themeSlice.actions;

export const selectThemeMode = (state: RootState): ThemeModeType =>
  state.theme.themeMode;

export default themeSlice.reducer;
