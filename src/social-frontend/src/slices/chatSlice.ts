import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IChatMessage {
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  isCurrentUserReceiver: boolean;
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
      let friendId = action.payload.receiverId;
      if (action.payload.isCurrentUserReceiver) {
        friendId = action.payload.senderId;
      }

      if (state.messages[friendId] === undefined) {
        state.messages[friendId] = [];
      }
      state.messages[friendId].push(action.payload);
    }
  }
});

export const { addChatMessage } = chatSlice.actions;

export const selectChatMessages = (state: RootState): IChatMessagesDictionary =>
  state.chat.messages;

export default chatSlice.reducer;
