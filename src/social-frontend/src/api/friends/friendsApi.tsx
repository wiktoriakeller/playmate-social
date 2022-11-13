import { createApi } from "@reduxjs/toolkit/query/react";
import { baseReauthQuery } from "../baseReauthQuery";
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
        url: "/friends",
        method: "GET"
      })
    })
  })
});

export const { useLazyGetFriendsListQuery } = friendsApi;

export default friendsApi.reducer;
