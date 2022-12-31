import { createApi } from "@reduxjs/toolkit/query/react";
import { baseReauthQuery } from "../baseReauthQuery";
import { IGetFriendsListRequest } from "./requests/getFriendsListRequest";
import { IGetFriendRequestsResponse } from "./responses/getFriendRequestsResponse";
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
    getFriendRequests: builder.query<IGetFriendRequestsResponse, void>({
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
