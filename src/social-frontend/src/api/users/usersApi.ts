import { createApi } from "@reduxjs/toolkit/query/react";
import { baseReauthQuery } from "../baseReauthQuery";
import { ISearchUsersRequest } from "./requests/searchUsersRequest";
import { IUpdateUserRequest } from "./requests/updateUserRequest";
import { ISearchUsersResponse } from "./responses/searchUsersResponse";
import { IUpdateUserResponse } from "./responses/updateUserResponse";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseReauthQuery,
  endpoints: (builder) => ({
    searchUsers: builder.query<ISearchUsersResponse, ISearchUsersRequest>({
      query: (request) => ({
        url: `/users/${request.username}`,
        method: "GET"
      })
    }),
    updateUser: builder.mutation<IUpdateUserResponse, IUpdateUserRequest>({
      query: (request) => ({
        url: `users/${request.userId}`,
        method: "PUT",
        body: request.formData
      })
    })
  })
});

export const {
  useSearchUsersQuery,
  useLazySearchUsersQuery,
  useUpdateUserMutation
} = usersApi;

export default usersApi.reducer;
