import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import _ from "lodash";

export interface IUserState {
  id?: string;
  email?: string;
  username?: string;
  jwtToken?: string;
  refreshToken?: string;
}

export interface IUserTokens {
  jwtToken?: string;
  refreshToken?: string;
}

const userInitialState: IUserState = {
  id: null,
  email: null,
  username: null,
  jwtToken: null,
  refreshToken: null
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser(state: IUserState, action: PayloadAction<IUserState>) {
      _.assign(state, action.payload);
    },
    setUserTokens(state: IUserState, action: PayloadAction<IUserTokens>) {
      state.jwtToken = action.payload.jwtToken;
      state.refreshToken = action.payload.refreshToken;
    }
  }
});

export const { setUser, setUserTokens } = userSlice.actions;

export const selectUser = (state: RootState): IUserState => state.user;
export const selectUserTokens = (state: RootState): IUserTokens => ({
  jwtToken: state.user.jwtToken,
  refreshToken: state.user.refreshToken
});

export default userSlice.reducer;
