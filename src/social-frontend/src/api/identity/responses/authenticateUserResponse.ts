export interface IAuthenticateUserResponse {
  data: {
    id: string;
    email: string;
    username: string;
    jwtToken: string;
    refreshToken: string;
  };
}
