import axios, { AxiosRequestConfig } from "axios";
import { ISigninFormData } from "../types/formTypes";

export const ApiURL = "http://127.0.0.1:5000/api";

const playmateApi = axios.create({
  baseURL: ApiURL,
});

//TODO update when backend is ready
export const signupUser = async (data, config: AxiosRequestConfig<any>) => {
  try {
    const response = await playmateApi.post("/User/signup", data, config);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

export const signinUser = async (data : ISigninFormData, config: AxiosRequestConfig<any>) => {
  try {
    const response = await playmateApi.post("/User/signin", data, config);
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }
}