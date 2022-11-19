import { createApi } from "@reduxjs/toolkit/query/react";
import { baseReauthQuery } from "../baseReauthQuery";
import { IAuthenticateUserRequest } from "./requests/authenticateUserRequest";
import { ICreateUserRequest } from "./requests/createUserRequest";
import { IRefreshTokenRequest } from "./requests/refreshTokenRequest";
import { IAuthenticateUserResponse } from "./responses/authenticateUserResponse";
import { ICreateUserResponse } from "./responses/createUserResponse";
import { IRefreshTokenResponse } from "./responses/refreshTokenResponse";

export const identityApi = createApi({
  reducerPath: "identityApi",
  baseQuery: baseReauthQuery,
  endpoints: (builder) => ({
    authenticateUser: builder.mutation<
      IAuthenticateUserResponse,
      IAuthenticateUserRequest
    >({
      query: (request) => ({
        url: "/identity/login",
        method: "POST",
        body: request
      })
    }),
    createUser: builder.mutation<ICreateUserResponse, ICreateUserRequest>({
      query: (request) => ({
        url: "identity/register",
        method: "POST",
        body: request
      })
    }),
    refreshToken: builder.mutation<IRefreshTokenResponse, IRefreshTokenRequest>(
      {
        query: (request) => ({
          url: "identity/refresh",
          method: "POST",
          body: request
        })
      }
    )
  })
});

export const {
  useAuthenticateUserMutation,
  useCreateUserMutation,
  useRefreshTokenMutation
} = identityApi;

export default identityApi.reducer;
