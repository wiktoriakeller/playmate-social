import Brightness3Icon from "@mui/icons-material/Brightness3";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectTheme, setTheme, ThemeType } from "../slices/themeSlice";
import { IconButtons } from "../styled/components/header/IconButtons";
import { StyledHeader } from "../styled/components/header/StyledHeader";
import { StyledLogo } from "../styled/components/header/StyledLogo";
import { StyledButton } from "../styled/components/mui/StyledButton";
import { StyledOutlinedButton } from "../styled/components/mui/StyledOutlinedButton";

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
    <StyledHeader>
      <StyledLogo>Playmate</StyledLogo>
      <IconButtons>
        <StyledOutlinedButton
          variant="outlined"
          className="icon-button"
          onClick={toggleTheme}
        >
          {getCurrentThemeIcon(theme.theme)}
        </StyledOutlinedButton>
      </IconButtons>
    </StyledHeader>
  );
};
