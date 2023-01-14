import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IOnlineUsersState {
  onlineUsers: string[];
}

const onlineUsersInitialState: IOnlineUsersState = {
  onlineUsers: []
};

export const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState: onlineUsersInitialState,
  reducers: {
    setOnlineUsers(state: IOnlineUsersState, action: PayloadAction<string[]>) {
      state.onlineUsers = action.payload;
    },
    addUserToOnlineList(
      state: IOnlineUsersState,
      action: PayloadAction<{ userId: string; isOnline: boolean }>
    ) {
      if (action.payload.isOnline) {
        state.onlineUsers = state.onlineUsers.concat(action.payload.userId);
      } else {
        state.onlineUsers = state.onlineUsers.filter(
          (id) => id !== action.payload.userId
        );
      }
    }
  }
});

export const { setOnlineUsers, addUserToOnlineList } = onlineUsersSlice.actions;

export const selectOnlineUsers = (state: RootState) =>
  state.onlineUsers.onlineUsers;

export default onlineUsersSlice.reducer;
