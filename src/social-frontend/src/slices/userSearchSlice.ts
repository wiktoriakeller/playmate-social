import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserSearchItem } from "../api/users/responses/searchUsersResponse";
import { RootState } from "../app/store";

export interface ISearchUsers {
  users: IUserSearchItem[];
}

const userSearchInitialState: ISearchUsers = {
  users: null
};

export const userSearchSlice = createSlice({
  name: "userSearch",
  initialState: userSearchInitialState,
  reducers: {
    setUserSearch(
      state: ISearchUsers,
      action: PayloadAction<IUserSearchItem[]>
    ) {
      state.users = action.payload;
    },
    sendFriendRequest(
      state: ISearchUsers,
      action: PayloadAction<IUserSearchItem>
    ) {
      const index = state.users.findIndex((e) => e.id === action.payload.id);
      state.users[index] = action.payload;
    }
  }
});

export const { setUserSearch, sendFriendRequest } = userSearchSlice.actions;

export const selectUserSearch = (state: RootState): ISearchUsers =>
  state.userSearch;

export default userSearchSlice.reducer;
