import { ThemeType } from "../slices/themeSlice";
import { IUserIdentityState } from "../slices/userIdentitySlice";

const storeData = (key: string, value: string | null): void =>
  localStorage.setItem(key, value);

const getData = (key: string): string | null => localStorage.getItem(key);

export const storeUser = (user: IUserIdentityState): void =>
  storeData("user", JSON.stringify(user));

export const getUserFromStorage = (): IUserIdentityState | null => {
  const user = getData("user");

  if (user === null || user === "" || user === undefined) {
    return null;
  }

  return JSON.parse(user);
};

export const clearUserFromStorage = (): void => localStorage.removeItem("user");

export const storeTheme = (theme: ThemeType): void => storeData("theme", theme);

export const getThemeFromStorage = (): ThemeType | null =>
  getData("theme") as ThemeType;
