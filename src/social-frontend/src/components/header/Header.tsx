import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTheme, setTheme, ThemeType } from "../../slices/themeSlice";
import { selectUser } from "../../slices/userSlice";
import { HeaderCenter } from "../../styled/components/header/HeaderCenter";
import { HeaderLeftSide } from "../../styled/components/header/HeaderLeftSide";
import { HeaderRightSide } from "../../styled/components/header/HeaderRightSide";
import { StyledHeader } from "../../styled/components/header/StyledHeader";
import { StyledLogo } from "../../styled/components/header/StyledLogo";
import { StyledIconButton } from "../../styled/components/mui/StyledIconButton";
import UserMenu from "../user/UserMenu";
import HeaderTabs from "./HeaderTabs";

export const Header = () => {
  const theme = useAppSelector(selectTheme);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const getCurrentThemeIcon = (theme: ThemeType) => {
    if (theme === "light") {
      return <Brightness7Icon sx={{ fontSize: "32px" }} />;
    }

    return <Brightness4Icon sx={{ fontSize: "32px" }} />;
  };

  const toggleTheme = () => {
    if (theme.theme === "dark") {
      dispatch(setTheme({ theme: "light" }));
    } else {
      dispatch(setTheme({ theme: "dark" }));
    }
  };

  const getHeaderCenter = () => {
    if (user.jwtToken) {
      return <HeaderTabs />;
    }
  };

  const getUserMenu = () => {
    if (user.jwtToken) {
      return <UserMenu />;
    }
  };

  return (
    <StyledHeader>
      <HeaderLeftSide>
        <StyledLogo>Playmate</StyledLogo>
      </HeaderLeftSide>
      <HeaderCenter>{getHeaderCenter()}</HeaderCenter>
      <HeaderRightSide>
        <StyledIconButton onClick={toggleTheme}>
          {getCurrentThemeIcon(theme.theme)}
        </StyledIconButton>
        {getUserMenu()}
      </HeaderRightSide>
    </StyledHeader>
  );
};
