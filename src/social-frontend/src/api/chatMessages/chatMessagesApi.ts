import { createApi } from "@reduxjs/toolkit/query/react";
import { baseReauthQuery } from "../baseReauthQuery";
import { IGetChatMessagesListRequest } from "./requests/getChatMessagesListRequest";
import { IGetChatMessagesListResponse } from "./responses/getChatMessagesListResponse";

export const chatMessagesApi = createApi({
  reducerPath: "chatMessagesApi",
  baseQuery: baseReauthQuery,
  endpoints: (builder) => ({
    getChatMessagesList: builder.query<
      IGetChatMessagesListResponse,
      IGetChatMessagesListRequest
    >({
      query: (request) => ({
        url: `/chat-messages?friendId=${request.friendId}`,
        method: "GET"
      })
    })
  })
});

export const { useLazyGetChatMessagesListQuery, useGetChatMessagesListQuery } =
  chatMessagesApi;

export default chatMessagesApi.reducer;
