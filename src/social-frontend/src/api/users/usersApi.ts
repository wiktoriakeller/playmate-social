import { createApi } from "@reduxjs/toolkit/query/react";
import { baseReauthQuery } from "../baseReauthQuery";
import { ISearchUsersRequest } from "./requests/ISearchUsersRequest";
import { ISearchUsersResponse } from "./responses/ISearchUsersResponse";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseReauthQuery,
  endpoints: (builder) => ({
    searchUsers: builder.query<ISearchUsersResponse, ISearchUsersRequest>({
      query: (request) => ({
        url: `/identity/search/${request.username}`,
        method: "GET"
      })
    })
  })
});

export const { useSearchUsersQuery, useLazySearchUsersQuery } = usersApi;

export default usersApi.reducer;
