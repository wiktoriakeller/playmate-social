import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IChatMessage {
  message: string;
  friendUserId: string;
}

export interface IChatState {
  messages: IChatMessage[];
}

const chatInitialState: IChatState = {
  messages: []
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: chatInitialState,
  reducers: {
    addChatMessage(state: IChatState, action: PayloadAction<IChatMessage>) {
      state.messages.push(action.payload);
    }
  }
});

export const { addChatMessage } = chatSlice.actions;

export const selectChatMessages = (state: RootState): IChatMessage[] =>
  state.chat.messages;

export default chatSlice.reducer;
