import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "../app/store";
import { getUserFromStorage } from "../common/storage";

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

const getUserIdentityInitialState = () => {
  const user = getUserFromStorage();

  if (user === null) {
    return getEmptyUserIdentity();
  }

  return user;
};

export const userIdentitySlice = createSlice({
  name: "user",
  initialState: getUserIdentityInitialState(),
  reducers: {
    setUserIdentity(
      state: IUserIdentityState,
      action: PayloadAction<IUserIdentityState>
    ) {
      _.assign(state, action.payload);
    },
    setUserTokens(
      state: IUserIdentityState,
      action: PayloadAction<IUserTokens>
    ) {
      state.jwtToken = action.payload.jwtToken;
      state.refreshToken = action.payload.refreshToken;
    }
  }
});

export const { setUserIdentity, setUserTokens } = userIdentitySlice.actions;

export const selectUserIdentity = (state: RootState): IUserIdentityState =>
  state.user;
export const selectUserTokens = (state: RootState): IUserTokens => ({
  jwtToken: state.user.jwtToken,
  refreshToken: state.user.refreshToken
});

export default userIdentitySlice.reducer;
