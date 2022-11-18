import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IStartGameRequest } from "./requests/startGameRequest";
import { IStartGameResponse } from "./responses/startGameResponse";

export const gameIntegrationApi = createApi({
  reducerPath: "gameIntegrationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    initiateGame: builder.query<IStartGameResponse, IStartGameRequest>({
      query: (request) => {
        console.log(request);

        return {
          url: request.gameUrl,
          method: "POST",
          body: request.payload
        };
      }
    })
  })
});

export const { useLazyInitiateGameQuery } = gameIntegrationApi;

export default gameIntegrationApi.reducer;
