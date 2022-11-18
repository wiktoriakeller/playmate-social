import { createApi } from "@reduxjs/toolkit/query/react";
import { baseReauthQuery } from "../baseReauthQuery";
import { IGetGamesRequest } from "./requests/getGamesRequest";
import { IGetGamesResponse } from "./responses/getGamesResponse";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: baseReauthQuery,
  endpoints: (builder) => ({
    getGames: builder.query<IGetGamesResponse, IGetGamesRequest>({
      query: () => ({
        url: "games",
        method: "GET"
      })
    })
  })
});

export const { useGetGamesQuery } = gamesApi;

export default gamesApi.reducer;
