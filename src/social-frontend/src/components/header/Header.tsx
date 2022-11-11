import Brightness2Icon from "@mui/icons-material/Brightness2";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentTab, TabName, tabsDictionary } from "../../slices/tabSlice";
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getCurrentThemeIcon = (theme: ThemeType) => {
    if (theme === "light") {
      return <WbSunnyIcon sx={{ fontSize: "32px" }} />;
    }

    return <Brightness2Icon sx={{ fontSize: "32px" }} />;
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

  const onLogoClick = () => {
    navigate("/");
    dispatch(setCurrentTab(tabsDictionary[0]));
  };

  return (
    <StyledHeader>
      <HeaderLeftSide>
        <StyledLogo onClick={onLogoClick}>Playmate</StyledLogo>
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
