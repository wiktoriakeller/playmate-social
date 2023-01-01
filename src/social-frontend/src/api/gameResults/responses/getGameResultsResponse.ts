import { IGameResultsDictionary } from "../../../slices/gameResultsSlice";
import { IResponse } from "../../baseApiResponse";

export interface IGetGameResultsResponse extends IResponse {
  data: {
    results: IGameResultsDictionary;
  };
}
