import Brightness3Icon from "@mui/icons-material/Brightness3";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTheme, setTheme, ThemeType } from "../../slices/themeSlice";
import { selectUserTokens } from "../../slices/userSlice";
import { HeaderCenter } from "../../styled/components/header/HeaderCenter";
import { HeaderLeftSide } from "../../styled/components/header/HeaderLeftSide";
import { HeaderRightSide } from "../../styled/components/header/HeaderRightSide";
import { StyledHeader } from "../../styled/components/header/StyledHeader";
import { StyledLogo } from "../../styled/components/header/StyledLogo";
import { StyledIconButton } from "../../styled/components/mui/StyledIconButton";
import HeaderTabs from "./HeaderTabs";

export const Header = () => {
  const theme = useAppSelector(selectTheme);
  const userTokens = useAppSelector(selectUserTokens);
  const dispatch = useAppDispatch();

  const getCurrentThemeIcon = (theme: ThemeType) => {
    if (theme === "light") {
      return <WbSunnyIcon sx={{ fontSize: "32px" }} />;
    }

    return <Brightness3Icon sx={{ fontSize: "32px" }} />;
  };

  const toggleTheme = () => {
    if (theme.theme === "dark") {
      dispatch(setTheme({ theme: "light" }));
    } else {
      dispatch(setTheme({ theme: "dark" }));
    }
  };

  const getHeaderCenter = () => {
    if (userTokens.jwtToken) {
      return <HeaderTabs />;
    }

    return <></>;
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
      </HeaderRightSide>
    </StyledHeader>
  );
};
