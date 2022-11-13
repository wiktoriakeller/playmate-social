import { createApi } from "@reduxjs/toolkit/query/react";
import { baseReauthQuery } from "../baseReauthQuery";
import { ISendFriendRequestRequest } from "./requests/ISendFriendRequestRequest";
import { ISendFriendRequestResponse } from "./responses/ISendFriendRequestResponse";
import { IGetFriendsListRequest } from "./requests/IGetFriendsListRequest";
import { IGetFriendsListResponse } from "./responses/IGetFriendsListResponse";

export const friendsApi = createApi({
  reducerPath: "friendsApi",
  baseQuery: baseReauthQuery,
  endpoints: (builder) => ({
    getFriendsList: builder.query<
      IGetFriendsListResponse,
      IGetFriendsListRequest
    >({
      query: (request) => ({
        url: `/friends/?search=${request.search}`,
        method: "GET"
      })
    }),
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

export const { useLazyGetFriendsListQuery, useLazySendFriendRequestQuery } =
  friendsApi;

export default friendsApi.reducer;
