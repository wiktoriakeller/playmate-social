import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Menu, MenuItem } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import { selectThemeMode, setThemeMode } from "../../slices/themeSlice";
import {
  getEmptyUserIdentity,
  setUserIdentity
} from "../../slices/userIdentitySlice";
import { selectWindowSizeState } from "../../slices/windowSizeSlice";
import { getCurrentThemeIcon } from "../header/Header";
import UserAvatar from "./UserAvatar";
import UserProfileDialog from "./UserProfileDialog";

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const windowSize = useAppSelector(selectWindowSizeState);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleToggleTheme = useCallback(() => {
    if (themeMode === "dark") {
      dispatch(setThemeMode({ themeMode: "light" }));
    } else {
      dispatch(setThemeMode({ themeMode: "dark" }));
    }
  }, [themeMode, dispatch]);

  const handleUserLogout = useCallback(() => {
    dispatch(setUserIdentity(getEmptyUserIdentity()));
    handleCloseUserMenu();
    navigate("/login");
  }, [dispatch, navigate, handleCloseUserMenu]);

  const handleUserProfileOpen = useCallback(() => {
    handleCloseUserMenu();
    setIsUserProfileOpen(true);
  }, [handleCloseUserMenu]);

  const handleUserProfileClose = () => {
    setIsUserProfileOpen(false);
  };

  const settings = useMemo(() => {
    let commonSettings = [
      {
        name: "Profile",
        handler: handleUserProfileOpen,
        icon: <AccountBoxIcon sx={{ marginLeft: "-2px" }} />
      },
      {
        name: "Logout",
        handler: handleUserLogout,
        icon: <LogoutIcon />
      }
    ];

    if (windowSize.matchesSmallWidth) {
      commonSettings = [
        {
          name: "Theme",
          handler: handleToggleTheme,
          icon: getCurrentThemeIcon(themeMode, false, "24px")
        },
        ...commonSettings
      ];
    }

    return commonSettings;
  }, [
    handleUserProfileOpen,
    handleUserLogout,
    handleToggleTheme,
    themeMode,
    windowSize.matchesSmallWidth
  ]);

  return (
    <>
      <UserAvatar onAvatarClick={handleOpenUserMenu} />
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={anchorElUser !== null}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.name} onClick={setting.handler}>
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {setting.icon}
              <span>{setting.name}</span>
            </Box>
          </MenuItem>
        ))}
      </Menu>
      <UserProfileDialog
        isOpen={isUserProfileOpen}
        handleCloseDialog={handleUserProfileClose}
      />
    </>
  );
};

export default UserMenu;
