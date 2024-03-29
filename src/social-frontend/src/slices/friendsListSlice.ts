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
  profilePictureUrl?: string;
}

export interface IFriendsListState {
  friends: IFriend[];
  selectedFriend?: IFriend;
  searchPhrase: string;
}

export interface IUpdateFriendData {
  friendId: string;
  profilePictureUrl: string;
  username: string;
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
      state.friends = [action.payload, ...state.friends];
    },
    setSelectedFriend(
      state: IFriendsListState,
      action: PayloadAction<IFriend | null>
    ) {
      state.selectedFriend = action.payload;
    },
    setFriendLastChatMessage(
      state: IFriendsListState,
      action: PayloadAction<ILastChatMessage & { friendId: string }>
    ) {
      state.friends = state.friends.map((friend) =>
        friend.id !== action.payload.friendId
          ? friend
          : { ...friend, lastChatMessage: action.payload }
      );
    },
    setFriendsListSearchPhrase(
      state: IFriendsListState,
      action: PayloadAction<string>
    ) {
      state.searchPhrase = action.payload;
    },
    updateFriendData(
      state: IFriendsListState,
      action: PayloadAction<IUpdateFriendData>
    ) {
      state.friends = state.friends.map((friend) =>
        friend.id === action.payload.friendId
          ? { ...friend, ...action.payload }
          : friend
      );
    },
    updateSelectedFriend(
      state: IFriendsListState,
      action: PayloadAction<IUpdateFriendData>
    ) {
      if (
        !!state.selectedFriend &&
        action.payload.friendId === state.selectedFriend?.id
      ) {
        state.selectedFriend.profilePictureUrl =
          action.payload.profilePictureUrl;
        state.selectedFriend.username = action.payload.username;
      }
    }
  }
});

export const {
  setFriendsList,
  setSelectedFriend,
  setFriendsListSearchPhrase,
  addFriend,
  setFriendLastChatMessage,
  updateFriendData,
  updateSelectedFriend
} = friendsListSlice.actions;

export const selectFriendsList = (state: RootState): IFriend[] =>
  state.friendsList.friends;
export const selectSelectedFriend = (state: RootState): IFriend | null =>
  state.friendsList.selectedFriend;
export const selectFriendsListSearchPhrase = (state: RootState): string =>
  state.friendsList.searchPhrase;

export default friendsListSlice.reducer;
