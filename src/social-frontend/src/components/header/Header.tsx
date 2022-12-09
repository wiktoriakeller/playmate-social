import Brightness2Icon from "@mui/icons-material/Brightness2";
import PeopleIcon from "@mui/icons-material/People";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentTab, tabsDictionary } from "../../slices/tabSlice";
import { selectTheme, setTheme, ThemeType } from "../../slices/themeSlice";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { HeaderCenter } from "../../styled/components/header/HeaderCenter";
import { HeaderLeftSide } from "../../styled/components/header/HeaderLeftSide";
import { HeaderRightSide } from "../../styled/components/header/HeaderRightSide";
import { StyledHeader } from "../../styled/components/header/StyledHeader";
import { StyledLogo } from "../../styled/components/header/StyledLogo";
import { StyledIconButton } from "../../styled/components/mui/StyledIconButton";
import NotificationsButton from "../friendsRequests/NotificationsButton";
import UserMenu from "../user/UserMenu";
import HeaderTabs from "./HeaderTabs";

export const Header = () => {
  const theme = useAppSelector(selectTheme);
  const user = useAppSelector(selectUserIdentity);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getCurrentThemeIcon = (theme: ThemeType) => {
    if (theme === "light") {
      return <WbSunnyIcon sx={{ fontSize: "28px" }} />;
    }

    return <Brightness2Icon sx={{ fontSize: "28px" }} />;
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
      return (
        <>
          <NotificationsButton />
          <UserMenu />
        </>
      );
    }
  };

  const onLogoClick = () => {
    navigate("/");
    dispatch(setCurrentTab(tabsDictionary[0]));
  };

  return (
    <StyledHeader>
      <HeaderLeftSide>
        <StyledLogo onClick={onLogoClick}>
          <PeopleIcon sx={{ fontSize: "32px" }} />
          <span>playmate</span>
        </StyledLogo>
      </HeaderLeftSide>
      <HeaderCenter>{getHeaderCenter()}</HeaderCenter>
      <HeaderRightSide isHomePage={user.jwtToken !== null}>
        <Tooltip title={"Toggle theme"}>
          <StyledIconButton onClick={toggleTheme}>
            {getCurrentThemeIcon(theme.theme)}
          </StyledIconButton>
        </Tooltip>
        {getUserMenu()}
      </HeaderRightSide>
    </StyledHeader>
  );
};
