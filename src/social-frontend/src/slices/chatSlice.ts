import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IChatMessage {
  senderId: string;
  senderUsername: string;
  receiverId: string;
  content: string;
  isCurrentUserReceiver: boolean;
  createdAt: string;
  joinGameUrl?: string;
}

export interface IFriendChatMessagesList {
  friendId: string;
  messages: IChatMessage[];
  pageNumber: number;
}

export interface IPaginatedChatMessages {
  currentPageNumber: number;
  messages: IChatMessage[];
}

export interface IChatMessagesDictionary {
  [key: string]: IPaginatedChatMessages;
}

export interface IChatState {
  chatState: IChatMessagesDictionary;
}

const chatInitialState: IChatState = {
  chatState: {}
};

const getChatMessageWithFormattedDate = (
  message: IChatMessage
): IChatMessage => {
  return {
    ...message,
    createdAt: new Date(message.createdAt).toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long"
    })
  };
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

      if (state.chatState[friendId] === undefined) {
        state.chatState[friendId] = {
          currentPageNumber: 0,
          messages: []
        };
      }

      state.chatState[friendId].messages = [
        getChatMessageWithFormattedDate(action.payload),
        ...state.chatState[friendId].messages
      ];
    },
    addChatMessagesList(
      state: IChatState,
      action: PayloadAction<IFriendChatMessagesList>
    ) {
      const friendId = action.payload.friendId;
      if (state.chatState[friendId] === undefined) {
        state.chatState[friendId] = {
          currentPageNumber: 0,
          messages: []
        };
      }

      const formattedMessages = action.payload.messages.map((message) =>
        getChatMessageWithFormattedDate(message)
      );

      state.chatState[friendId].messages =
        state.chatState[friendId].messages.concat(formattedMessages);

      state.chatState[friendId].currentPageNumber = action.payload.pageNumber;
    }
  }
});

export const { addChatMessage, addChatMessagesList } = chatSlice.actions;

export const selectChatMessages = (state: RootState): IChatMessagesDictionary =>
  state.chat.chatState;

export default chatSlice.reducer;
