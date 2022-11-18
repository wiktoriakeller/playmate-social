import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IStartGameRequest } from "./requests/startGameRequest";
import { IStartGameResponse } from "./responses/startGameResponse";
import _ from "lodash";

export const gameIntegrationApi = createApi({
  reducerPath: "gameIntegrationApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    initiateGame: builder.query<IStartGameResponse, IStartGameRequest>({
      query: (request) => ({
        url: request.gameUrl,
        method: "POST",
        body: _.omit(request, "gameUrl")
      })
    })
  })
});

export const { useLazyInitiateGameQuery } = gameIntegrationApi;

export default gameIntegrationApi.reducer;
