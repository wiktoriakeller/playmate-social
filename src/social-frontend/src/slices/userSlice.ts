import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IUserState {
  id?: string;
  email?: string;
  username?: string;
  userTokens: IUserTokens;
}

export interface IUserTokens {
  jwtToken?: string;
  refreshToken?: string;
}

const userInitialState: IUserState = {
  id: null,
  email: null,
  username: null,
  userTokens: {
    jwtToken: null,
    refreshToken: null
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser(state: IUserState, action: PayloadAction<IUserState>) {
      state = action.payload;
    },
    setUserTokens(state: IUserState, action: PayloadAction<IUserTokens>) {
      state.userTokens = action.payload;
    }
  }
});

export const { setUser, setUserTokens } = userSlice.actions;

export const selectUser = (state: RootState): IUserState => state.user;
export const selectUserTokens = (state: RootState): IUserTokens =>
  state.user.userTokens;

export default userSlice.reducer;
