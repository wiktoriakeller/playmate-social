import { IResponse } from "../../baseApiResponse";

export interface ICreateUserResponse extends IResponse {
  data: {
    id: string;
  };
}
