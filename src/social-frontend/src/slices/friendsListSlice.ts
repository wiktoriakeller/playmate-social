import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface ILastChatMessage {
  content: string;
  senderId: string;
  senderUsername: string;
}

export interface IFriend {
  id: string;
  username: string;
  lastChatMessage?: ILastChatMessage;
}

export interface IFriendsListState {
  friends: IFriend[];
  selectedFriend?: IFriend;
  searchPhrase: string;
}

const friendsListInitialState: IFriendsListState = {
  friends: [],
  selectedFriend: null,
  searchPhrase: ""
};

export const friendsListSlice = createSlice({
  name: "friendsList",
  initialState: friendsListInitialState,
  reducers: {
    setFriendsList(state: IFriendsListState, action: PayloadAction<IFriend[]>) {
      state.friends = action.payload;
    },
    addFriend(state: IFriendsListState, action: PayloadAction<IFriend>) {
      state.friends.push(action.payload);
    },
    setSelectedFriend(
      state: IFriendsListState,
      action: PayloadAction<IFriend | null>
    ) {
      state.selectedFriend = action.payload;
    },
    setFriendLastChatMessage(
      state: IFriendsListState,
      action: PayloadAction<ILastChatMessage>
    ) {
      state.friends = state.friends.map((friend) =>
        friend.id !== action.payload.senderId
          ? friend
          : { ...friend, lastChatMessage: action.payload }
      );
    },
    setFriendsListSearchPhrase(
      state: IFriendsListState,
      action: PayloadAction<string>
    ) {
      state.searchPhrase = action.payload;
    }
  }
});

export const {
  setFriendsList,
  setSelectedFriend,
  setFriendsListSearchPhrase,
  addFriend,
  setFriendLastChatMessage
} = friendsListSlice.actions;

export const selectFriendsList = (state: RootState): IFriend[] =>
  state.friendsList.friends;
export const selectSelectedFriend = (state: RootState): IFriend | null =>
  state.friendsList.selectedFriend;
export const selectFriendsListSearchPhrase = (state: RootState): string =>
  state.friendsList.searchPhrase;

export default friendsListSlice.reducer;
