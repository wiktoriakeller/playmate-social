import { createApi } from "@reduxjs/toolkit/query/react";
import { baseReauthQuery } from "../baseReauthQuery";
import { IGetGameResultsResponse } from "./responses/getGameResultsResponse";
import { IGetGameResultsRequest } from "./requests/getGameResultsRequest";

export const gameResultsApi = createApi({
  reducerPath: "gameResultsApi",
  baseQuery: baseReauthQuery,
  endpoints: (builder) => ({
    getGameResults: builder.query<
      IGetGameResultsResponse,
      IGetGameResultsRequest
    >({
      query: () => ({
        url: "results",
        method: "GET"
      })
    })
  })
});

export const { useLazyGetGameResultsQuery } = gameResultsApi;

export default gameResultsApi.reducer;
