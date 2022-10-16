import { useToken } from "./useToken";
import { signinUser, signupUser } from "../lib/playmateApi";

export const useApi = () => {
  const { token } = useToken();

  const signup = (data) => {
    return signupUser(
      {
        username: data.username,
        email: data.email,
        password: data.password
      },
      {
      headers: {
        "Content-type": "application/json",
      }
    });
  }

  const signin = (data) => {
    return signinUser(
      {
        email: data.email,
        password: data.password
      },
      {
      headers: {
        "Content-type": "application/json",
      }
    });
  }

  return {user: { signup, signin}}
};
