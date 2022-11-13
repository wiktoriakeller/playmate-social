import { createApi } from "@reduxjs/toolkit/query/react";
import { baseReauthQuery } from "../baseReauthQuery";
import { ISendFriendRequestRequest } from "../friends/requests/sendFriendRequestRequest";
import { ISendFriendRequestResponse } from "../friends/responses/sendFriendRequestResponse";

export const friendsApi = createApi({
  reducerPath: "friendsApi",
  baseQuery: baseReauthQuery,
  endpoints: (builder) => ({
    sendFriendRequest: builder.query<
      ISendFriendRequestResponse,
      ISendFriendRequestRequest
    >({
      query: (request) => ({
        url: "/friends",
        method: "POST",
        body: request
      })
    })
  })
});

export const { useLazySendFriendRequestQuery } = friendsApi;

export default friendsApi.reducer;
