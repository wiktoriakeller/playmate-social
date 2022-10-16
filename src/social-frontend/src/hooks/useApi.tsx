import { useToken } from "./useToken";
import { signinUser, signupUser } from "../lib/playmateApi";

export const useApi = () => {
  const { token, setToken } = useToken();

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

  const signin = async (data) => {
    data = await signinUser(
      {
        email: data.email,
        password: data.password
      },
      {
      headers: {
        "Content-type": "application/json",
      }
    });

    let userToken = data?.token
    if(!!userToken) {
      setToken(userToken);
      console.log("token set: " + userToken);
    }
    return;
  }

  return {user: { signup, signin}}
};
