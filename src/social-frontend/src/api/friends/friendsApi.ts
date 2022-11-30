import { createApi } from "@reduxjs/toolkit/query/react";
import { baseReauthQuery } from "../baseReauthQuery";
import { ISendFriendRequestRequest } from "./requests/sendFriendRequest";
import { ISendFriendRequestResponse } from "./responses/sendFriendRequestResponse";
import { IGetFriendsListRequest } from "./requests/getFriendsListRequest";
import { IGetFriendsListResponse } from "./responses/getFriendsListResponse";

export const friendsApi = createApi({
  reducerPath: "friendsApi",
  baseQuery: baseReauthQuery,
  endpoints: (builder) => ({
    getFriendsList: builder.query<
      IGetFriendsListResponse,
      IGetFriendsListRequest
    >({
      query: (request) => ({
        url: `/friends?search=${request.search}`,
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
