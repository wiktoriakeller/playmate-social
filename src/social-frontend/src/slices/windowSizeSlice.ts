import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IWindowSizeState {
  matchesMediumWidth: boolean;
  matchesSmallWidth: boolean;
  matchesExtraSmallWidth: boolean;
}

const windowInitialState: IWindowSizeState = {
  matchesMediumWidth: false,
  matchesSmallWidth: false,
  matchesExtraSmallWidth: false
};

export const windowSizeSlice = createSlice({
  name: "windowSize",
  initialState: windowInitialState,
  reducers: {
    setMatchesMediumWidth(
      state: IWindowSizeState,
      action: PayloadAction<boolean>
    ) {
      state.matchesMediumWidth = action.payload;
    },
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

export const {
  setMatchesMediumWidth,
  setMatchesSmallWidth,
  setMatchesExtraSmallWidth
} = windowSizeSlice.actions;

export const selectWindowSizeState = (state: RootState): IWindowSizeState =>
  state.windowSize;

export default windowSizeSlice.reducer;
