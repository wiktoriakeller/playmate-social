import axios, { AxiosRequestConfig } from "axios";

export const ApiURL = "http://127.0.0.1:5000/api";

const playmateApi = axios.create({
  baseURL: ApiURL,
});

//TODO update when backend is ready
export const signupUser = async (data, config: AxiosRequestConfig<any>) => {
  const response = await playmateApi.post("/User/signup", data, config);
  return response.data;
}