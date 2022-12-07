import { createApi } from "@reduxjs/toolkit/query/react";
import { baseReauthQuery } from "../baseReauthQuery";
import { IGetFriendsListRequest } from "./requests/getFriendsListRequest";
import { IGetFriendsListResponse } from "./responses/getFriendsListResponse";
import { IGetFriendRequestsRequest } from "./requests/getFriendRequestsRequest";
import { IGetFriendRequestsResponse } from "./responses/getFriendRequestsResponse";

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
    getFriendRequests: builder.query<
      IGetFriendRequestsResponse,
      IGetFriendRequestsRequest
    >({
      query: () => ({
        url: `/friends/requests`,
        method: "GET"
      })
    })
  })
});

export const { useLazyGetFriendsListQuery, useLazyGetFriendRequestsQuery } =
  friendsApi;

export default friendsApi.reducer;
