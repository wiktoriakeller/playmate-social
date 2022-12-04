import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface ISnackbarState {
  message: string;
}

const snackbarInitialState: ISnackbarState = {
  message: ""
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: snackbarInitialState,
  reducers: {
    setSnackbarMessage(
      state: ISnackbarState,
      action: PayloadAction<ISnackbarState>
    ) {
      state.message = action.payload.message;
    }
  }
});

export const { setSnackbarMessage } = snackbarSlice.actions;

export const selectSnackbarState = (state: RootState): ISnackbarState =>
  state.snackbar;

export default snackbarSlice.reducer;
