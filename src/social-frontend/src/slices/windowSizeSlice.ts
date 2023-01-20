import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IWindowSizeState {
  matchesSmallWidth: boolean;
  matchesExtraSmallWidth: boolean;
}

const windowInitialState: IWindowSizeState = {
  matchesSmallWidth: false,
  matchesExtraSmallWidth: false
};

export const windowSizeSlice = createSlice({
  name: "windowSize",
  initialState: windowInitialState,
  reducers: {
    setMatchesSmallWidth(
      state: IWindowSizeState,
      action: PayloadAction<boolean>
    ) {
      state.matchesSmallWidth = action.payload;
    },
    setMatchesExtraSmallWidth(
      state: IWindowSizeState,
      action: PayloadAction<boolean>
    ) {
      state.matchesExtraSmallWidth = action.payload;
    }
  }
});

export const { setMatchesSmallWidth, setMatchesExtraSmallWidth } =
  windowSizeSlice.actions;

export const selectWindowSizeState = (state: RootState): IWindowSizeState =>
  state.windowSize;

export default windowSizeSlice.reducer;
