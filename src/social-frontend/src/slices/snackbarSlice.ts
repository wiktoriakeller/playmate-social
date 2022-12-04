import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "../app/store";

export enum SnackbarSeverity {
  Error = "error",
  Warning = "warning",
  Info = "info",
  Success = "success"
}

export interface ISnackbarState {
  message: string;
  severity: SnackbarSeverity;
  isOpen: boolean;
}

export interface IOpenSnackbar {
  message: string;
  severity: SnackbarSeverity;
  status?: number | string;
}

const snackbarInitialState: ISnackbarState = {
  message: "",
  severity: SnackbarSeverity.Success,
  isOpen: false
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: snackbarInitialState,
  reducers: {
    openSnackbar(state: ISnackbarState, action: PayloadAction<IOpenSnackbar>) {
      const message =
        action.payload.status === "FETCH_ERROR"
          ? "Server is down"
          : action.payload.message;
      _.assign(state, { ...action.payload, isOpen: true, message: message });
    },
    closeSnackbar(state: ISnackbarState) {
      state.isOpen = false;
    }
  }
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export const selectSnackbarState = (state: RootState): ISnackbarState =>
  state.snackbar;

export default snackbarSlice.reducer;
