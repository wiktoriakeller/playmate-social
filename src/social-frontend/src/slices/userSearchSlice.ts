import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserSearchItem } from "../api/users/responses/searchUsersResponse";
import { RootState } from "../app/store";

export interface ISearchUsersState {
  users: IUserSearchItem[];
}

const userSearchInitialState: ISearchUsersState = {
  users: null
};

export const userSearchSlice = createSlice({
  name: "userSearch",
  initialState: userSearchInitialState,
  reducers: {
    setUserSearch(
      state: ISearchUsersState,
      action: PayloadAction<IUserSearchItem[]>
    ) {
      state.users = action.payload;
    },
    sendFriendRequest(
      state: ISearchUsersState,
      action: PayloadAction<IUserSearchItem>
    ) {
      const index = state.users.findIndex((e) => e.id === action.payload.id);
      state.users[index] = action.payload;
    }
  }
});

export const { setUserSearch, sendFriendRequest } = userSearchSlice.actions;

export const selectUserSearch = (state: RootState): ISearchUsersState =>
  state.userSearch;

export default userSearchSlice.reducer;
