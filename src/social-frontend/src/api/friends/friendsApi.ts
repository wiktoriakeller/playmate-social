import { createApi } from "@reduxjs/toolkit/query/react";
import { baseReauthQuery } from "../baseReauthQuery";
import { ISendFriendRequestRequest } from "./requests/sendFriendRequest";
import { ISendFriendRequestResponse } from "./responses/sendFriendRequestResponse";
import { IGetFriendsListRequest } from "./requests/getFriendsListRequest";
import { IGetFriendsListResponse } from "./responses/getFriendsListResponse";

export const friendsApi = createApi({
  reducerPath: "friendsApi",
  baseQuery: baseReauthQuery,
  tagTypes: ["friendsList"],
  endpoints: (builder) => ({
    getFriendsList: builder.query<
      IGetFriendsListResponse,
      IGetFriendsListRequest
    >({
      query: (request) => ({
        url: `/friends?search=${request.search}`,
        method: "GET"
      }),
      providesTags: ["friendsList"]
    }),
    sendFriendRequest: builder.mutation<
      ISendFriendRequestResponse,
      ISendFriendRequestRequest
    >({
      query: (request) => ({
        url: "/friends/requests",
        method: "POST",
        body: request
      })
    })
  })
});

export const { useLazyGetFriendsListQuery, useSendFriendRequestMutation } =
  friendsApi;

export default friendsApi.reducer;
