import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from "@reduxjs/toolkit/dist/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { getUserFromStorage } from "../common/storage";
import { setUserTokens } from "../slices/userSlice";

const apiUrl = process.env.REACT_APP_BASE_API_URL;
const baseUrl = `${apiUrl}/api/v1`;

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  mode: "cors",
  prepareHeaders: (headers, { endpoint }) => {
    const user = getUserFromStorage();

    if (user && user.jwtToken && endpoint !== "refresh") {
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

  if (result.error && result.error.status === 401) {
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

    if (refreshResponse.data) {
      api.dispatch(setUserTokens(refreshResponse.data));
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};