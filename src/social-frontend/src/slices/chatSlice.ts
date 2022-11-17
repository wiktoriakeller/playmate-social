import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IChatMessage {
  message: string;
  friendUserId: string;
  senderId: string;
}

export interface IChatMessagesDictionary {
  [key: string]: IChatMessage[];
}

export interface IChatState {
  messages: IChatMessagesDictionary;
}

const chatInitialState: IChatState = {
  messages: {}
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: chatInitialState,
  reducers: {
    addChatMessage(state: IChatState, action: PayloadAction<IChatMessage>) {
      if (state.messages[action.payload.friendUserId] === undefined) {
        state.messages[action.payload.friendUserId] = [];
      }

      state.messages[action.payload.friendUserId].push(action.payload);
    }
  }
});

export const { addChatMessage } = chatSlice.actions;

export const selectChatMessages = (state: RootState): IChatMessagesDictionary =>
  state.chat.messages;

export default chatSlice.reducer;
