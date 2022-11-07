import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "../app/store";
import { getUserFromStorage } from "../common/storage";

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

const getUserInitialState = () => {
  const user = getUserFromStorage();

  if (user === null) {
    return {
      id: null,
      email: null,
      username: null,
      jwtToken: null,
      refreshToken: null
    };
  }

  return user;
};

export const userSlice = createSlice({
  name: "user",
  initialState: getUserInitialState(),
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
