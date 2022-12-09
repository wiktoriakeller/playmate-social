import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IFriendRequest {
  requestId: string;
  from: {
    id: string;
    username: string;
  };
}

export interface IFriendRequestConfirmation {
  requestId: string;
  requesterid: string;
  accept: boolean;
}

export interface IFriendRequestsState {
  requests: IFriendRequest[];
}

const friendsRequestsInitialState: IFriendRequestsState = {
  requests: []
};

export const friendRequestsSlice = createSlice({
  name: "friendRequests",
  initialState: friendsRequestsInitialState,
  reducers: {
    addFriendRequest(
      state: IFriendRequestsState,
      action: PayloadAction<IFriendRequest>
    ) {
      state.requests.push(action.payload);
    },
    setFriendRequests(
      state: IFriendRequestsState,
      action: PayloadAction<IFriendRequest[]>
    ) {
      state.requests = action.payload;
    },
    answerFriendRequests(
      state: IFriendRequestsState,
      action: PayloadAction<IFriendRequestConfirmation>
    ) {
      state.requests = state.requests.filter(
        (request) => request.requestId !== action.payload.requestId
      );
    }
  }
});

export const { addFriendRequest, setFriendRequests, answerFriendRequests } =
  friendRequestsSlice.actions;

export const selectFriendRequests = (state: RootState): IFriendRequest[] =>
  state.friendRequests.requests;

export default friendRequestsSlice.reducer;
