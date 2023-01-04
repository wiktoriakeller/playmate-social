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

export interface IFriendMessages {
  canAddNewMessagesList: boolean;
  pageNumber: number;
  messages: IChatMessage[];
}

export interface IChatMessagesDictionary {
  [friendId: string]: IFriendMessages;
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
          messages: [],
          pageNumber: 0,
          canAddNewMessagesList: false
        };
      }

      state.chatState[friendId].messages = [
        getChatMessageWithFormattedDate(action.payload),
        ...state.chatState[friendId].messages
      ];
    },
    addChatMessagesList(
      state: IChatState,
      action: PayloadAction<IFriendMessages & { friendId: string }>
    ) {
      const friendId = action.payload.friendId;
      if (state.chatState[friendId] === undefined) {
        state.chatState[friendId] = {
          messages: [],
          pageNumber: 0,
          canAddNewMessagesList: true
        };
      }

      if (
        state.chatState[friendId].canAddNewMessagesList &&
        action.payload.canAddNewMessagesList
      ) {
        const formattedMessages = action.payload.messages.map((message) =>
          getChatMessageWithFormattedDate(message)
        );

        state.chatState[friendId].messages =
          state.chatState[friendId].messages.concat(formattedMessages);
        state.chatState[friendId].pageNumber = action.payload.pageNumber;
        state.chatState[friendId].canAddNewMessagesList = false;
      }
    },
    clearChatState(state: IChatState) {
      state.chatState = {};
    },
    setCanAddNewMessagesList(
      state: IChatState,
      action: PayloadAction<{ canAdd: boolean; friendId: string }>
    ) {
      state.chatState[action.payload.friendId].canAddNewMessagesList =
        action.payload.canAdd;
    }
  }
});

export const {
  addChatMessage,
  addChatMessagesList,
  clearChatState,
  setCanAddNewMessagesList
} = chatSlice.actions;

export const selectChatState = (state: RootState): IChatMessagesDictionary =>
  state.chat.chatState;

export default chatSlice.reducer;
