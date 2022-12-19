import { IResponse } from "../../baseApiResponse";

export interface IGetGamesResponse extends IResponse {
  data: {
    games: IGame[];
  };
}

export interface IGame {
  id: string;
  name: string;
  description: string;
  serverUrl: string;
  imageUrl: string;
}
