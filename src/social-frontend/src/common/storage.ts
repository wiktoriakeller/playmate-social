import { IUserState } from "../slices/userSlice";

export const storeData = (key: string, value: string | null): void =>
  localStorage.setItem(key, value);

export const getData = (key: string): string | null =>
  localStorage.getItem(key);

export const storeUser = (user: IUserState): void =>
  storeData("user", JSON.stringify(user));

export const getUserFromStorage = (): IUserState | null =>
  JSON.parse(getData("user"));

export const clearUserFromStorage = (): void => storeData("user", null);
