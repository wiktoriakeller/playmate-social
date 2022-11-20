import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "../app/store";

export interface IUserIdentityState {
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

export const getEmptyUserIdentity = () => ({
  id: null,
  email: null,
  username: null,
  jwtToken: null,
  refreshToken: null
});

export const userIdentitySlice = createSlice({
  name: "user",
  initialState: getEmptyUserIdentity(),
  reducers: {
    setUserIdentity(
      state: IUserIdentityState,
      action: PayloadAction<IUserIdentityState>
    ) {
      _.assign(state, action.payload);
    }
  }
});

export const { setUserIdentity } = userIdentitySlice.actions;

export const selectUserIdentity = (state: RootState): IUserIdentityState =>
  state.user;

export const selectUserTokens = (state: RootState): IUserTokens => ({
  jwtToken: state.user.jwtToken,
  refreshToken: state.user.refreshToken
});

export default userIdentitySlice.reducer;
