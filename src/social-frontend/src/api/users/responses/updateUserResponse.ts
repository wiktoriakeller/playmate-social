import { IResponse } from "../../baseApiResponse";

export interface IUpdateUserResponse extends IResponse {
  data: {
    username: string;
    profilePictureUrl: string;
  };
}
