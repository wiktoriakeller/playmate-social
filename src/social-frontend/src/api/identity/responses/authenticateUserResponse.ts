import { IResponse } from "../../baseApiResponse";

export interface IAuthenticateUserResponse extends IResponse {
  data: {
    id: string;
    email: string;
    username: string;
    jwtToken: string;
    refreshToken: string;
  };
}
