import { createApi } from "@reduxjs/toolkit/query/react";
import { baseReauthQuery } from "../baseReauthQuery";
import { IGetGamesResponse } from "./responses/getGamesResponse";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: baseReauthQuery,
  endpoints: (builder) => ({
    getGames: builder.query<IGetGamesResponse, void>({
      query: () => ({
        url: "games",
        method: "GET"
      })
    })
  })
});

export const { useGetGamesQuery } = gamesApi;

export default gamesApi.reducer;
