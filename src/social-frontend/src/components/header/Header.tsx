import Brightness2Icon from "@mui/icons-material/Brightness2";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Tooltip, useMediaQuery } from "@mui/material";
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
  fontSize: string
) => {
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
  const matchesMediumWidth = useMediaQuery("only screen and (max-width:600px)");

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

  const getUserMenu = (side: "left" | "right") => {
    if (!!user.jwtToken) {
      if (windowSize.matchesSmallWidth && side === "left") {
        return <UserMenu />;
      }

      if (windowSize.matchesSmallWidth && side === "right") {
        return <NotificationsButton />;
      }

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
        {matchesMediumWidth ? (
          getUserMenu("left")
        ) : (
          <StyledLogo onClick={onLogoClick}>
            <SportsEsportsIcon sx={{ fontSize: "32px", marginTop: "3px" }} />
            <span>playmate</span>
          </StyledLogo>
        )}
      </HeaderLeftSide>
      <HeaderCenter>{getHeaderCenter()}</HeaderCenter>
      <HeaderRightSide isHomePage={user.jwtToken !== null}>
        <Tooltip title={"Toggle theme"}>
          <StyledIconButton
            onClick={toggleTheme}
            sx={{ marginRight: "-2px", marginLeft: "-8px" }}
            id="theme-toggle-button"
          >
            {getCurrentThemeIcon(themeMode, "28px")}
          </StyledIconButton>
        </Tooltip>
        {getUserMenu("right")}
      </HeaderRightSide>
    </StyledHeader>
  );
};
