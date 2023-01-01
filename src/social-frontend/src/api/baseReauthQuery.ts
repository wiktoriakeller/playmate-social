import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from "@reduxjs/toolkit/dist/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { getUserFromStorage } from "../common/storage";
import {
  getEmptyUserIdentity,
  setUserIdentity
} from "../slices/userIdentitySlice";
import { IRefreshTokenResponse } from "./identity/responses/refreshTokenResponse";

const baseUrl = process.env.REACT_APP_BASE_API_URL;
export const baseApiUrl = `${baseUrl}/api/v1`;

const baseQuery = fetchBaseQuery({
  baseUrl: baseApiUrl,
  mode: "cors",
  prepareHeaders: (headers) => {
    const user = getUserFromStorage();

    if (user && user.jwtToken) {
      headers.set("Authorization", `Bearer ${user.jwtToken}`);
    }

    return headers;
  }
});

export const baseReauthQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (!!result.error && result.error.status === 401) {
    const user = getUserFromStorage();

    const refreshResponse = await baseQuery(
      {
        url: "/identity/refresh",
        method: "POST",
        body: {
          jwtToken: user.jwtToken,
          refreshToken: user.refreshToken
        }
      },
      api,
      extraOptions
    );

    if (!!refreshResponse.error && refreshResponse.error.status !== 200) {
      api.dispatch(setUserIdentity(getEmptyUserIdentity()));
    }

    const mappedResponse = refreshResponse.data as IRefreshTokenResponse;

    if (mappedResponse && mappedResponse.data) {
      api.dispatch(
        setUserIdentity({
          ...user,
          ...mappedResponse.data
        })
      );
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
