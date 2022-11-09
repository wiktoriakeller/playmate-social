import { ThemeType } from "../slices/themeSlice";
import { IUserState } from "../slices/userSlice";

export const storeData = (key: string, value: string | null): void =>
  localStorage.setItem(key, value);

export const getData = (key: string): string | null =>
  localStorage.getItem(key);

export const storeUser = (user: IUserState): void =>
  storeData("user", JSON.stringify(user));

export const getUserFromStorage = (): IUserState | null => {
  const user = getData("user");

  if (user === null || user === "") {
    return null;
  }

  return JSON.parse(user);
};

export const clearUserFromStorage = (): void => localStorage.removeItem("user");

export const storeTheme = (theme: ThemeType): void => storeData("theme", theme);

export const getThemeFromStore = (): ThemeType | null =>
  getData("theme") as ThemeType;
