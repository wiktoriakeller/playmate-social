import { IResponse } from "../../baseApiResponse";

export interface IRefreshTokenResponse extends IResponse {
  data: {
    jwtToken: string;
    refreshToken: string;
  };
}
