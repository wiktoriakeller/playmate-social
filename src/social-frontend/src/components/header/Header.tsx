import Brightness2Icon from "@mui/icons-material/Brightness2";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import { setCurrentTab, tabsDictionary } from "../../slices/tabSlice";
import {
  selectThemeMode,
  setThemeMode,
  ThemeModeType
} from "../../slices/themeSlice";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { selectWindowSizeState } from "../../slices/windowSizeSlice";
import { StyledIconButton } from "../../styled/components/common/StyledIconButton";
import { HeaderCenter } from "../../styled/components/header/HeaderCenter";
import { HeaderLeftSide } from "../../styled/components/header/HeaderLeftSide";
import { HeaderRightSide } from "../../styled/components/header/HeaderRightSide";
import { StyledHeader } from "../../styled/components/header/StyledHeader";
import { StyledLogo } from "../../styled/components/header/StyledLogo";
import NotificationsButton from "../friendRequests/NotificationsButton";
import UserMenu from "../user/UserMenu";
import HeaderTabs from "./HeaderTabs";

export const getCurrentThemeIcon = (
  themeMode: ThemeModeType,
  matchesMediumWidth: boolean,
  fontSize: string
) => {
  if (matchesMediumWidth) {
    return <></>;
  }

  if (themeMode === "light") {
    return <WbSunnyIcon sx={{ fontSize: fontSize }} />;
  }

  return <Brightness2Icon sx={{ fontSize: fontSize }} />;
};

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const windowSize = useAppSelector(selectWindowSizeState);
  const user = useAppSelector(selectUserIdentity);

  const toggleTheme = () => {
    if (themeMode === "dark") {
      dispatch(setThemeMode({ themeMode: "light" }));
    } else {
      dispatch(setThemeMode({ themeMode: "dark" }));
    }
  };

  const getHeaderCenter = () => {
    if (!!user.jwtToken) {
      return <HeaderTabs />;
    }
  };

  const getUserMenu = () => {
    if (!!user.jwtToken) {
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
          <SportsEsportsIcon sx={{ fontSize: "32px", marginTop: "3px" }} />
          <span>playmate</span>
        </StyledLogo>
      </HeaderLeftSide>
      <HeaderCenter>{getHeaderCenter()}</HeaderCenter>
      <HeaderRightSide isHomePage={user.jwtToken !== null}>
        <Tooltip title={"Toggle theme"}>
          <StyledIconButton onClick={toggleTheme} sx={{ marginRight: "-2px" }}>
            {getCurrentThemeIcon(
              themeMode,
              windowSize.matchesMediumWidth,
              "28px"
            )}
          </StyledIconButton>
        </Tooltip>
        {getUserMenu()}
      </HeaderRightSide>
    </StyledHeader>
  );
};
