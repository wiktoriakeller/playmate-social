import Brightness3Icon from "@mui/icons-material/Brightness3";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectTheme, setTheme, ThemeType } from "../slices/themeSlice";

export const Header = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const getCurrentThemeIcon = (theme: ThemeType) => {
    if (theme === "light") {
      return <WbSunnyIcon fontSize="small" />;
    }

    return <Brightness3Icon fontSize="small" />;
  };

  const toggleTheme = () => {
    if (theme.theme === "dark") {
      dispatch(setTheme({ theme: "light" }));
    } else {
      dispatch(setTheme({ theme: "dark" }));
    }
  };

  return (
    <div className="main-header">
      <div className="main-logo">Playmate</div>
      <Button variant="outlined" className="icon-button" onClick={toggleTheme}>
        {getCurrentThemeIcon(theme.theme)}
      </Button>
    </div>
  );
};
