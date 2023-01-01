import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/storeHooks";
import {
  getEmptyUserIdentity,
  setUserIdentity
} from "../../slices/userIdentitySlice";
import UserAvatar from "./UserAvatar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import UserProfileDialog from "./UserProfileDialog";

const UserMenu = () => {
  const navigate = useNavigate();
  const disptach = useAppDispatch();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserLogout = () => {
    disptach(setUserIdentity(getEmptyUserIdentity()));
    handleCloseUserMenu();
    navigate("/login");
  };

  const handleUserProfileOpen = () => {
    handleCloseUserMenu();
    setIsUserProfileOpen(true);
  };

  const handleUserProfileClose = () => {
    setIsUserProfileOpen(false);
  };

  const settings = [
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
