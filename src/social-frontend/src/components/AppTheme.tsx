import { ReactNode } from "react";
import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../slices/themeSlice";

export interface IThemeSetterProps {
  children: ReactNode;
}

const AppTheme = ({ children }: IThemeSetterProps) => {
  const theme = useAppSelector(selectTheme);

  const getThemeClass = () => {
    if (theme.theme === "dark") {
      return "dark-mode";
    }

    return "";
  };

  return <div className={getThemeClass()}>{children}</div>;
};

export default AppTheme;
