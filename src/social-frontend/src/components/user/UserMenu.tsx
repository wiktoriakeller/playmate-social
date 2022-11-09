import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { clearUserFromStorage } from "../../common/storage";
import { getEmptyUser, setUser } from "../../slices/userSlice";

const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const disptach = useAppDispatch();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserLogout = () => {
    disptach(setUser(getEmptyUser()));
    handleCloseUserMenu();
    navigate("/login");
  };

  const handleUserProfile = () => {
    handleCloseUserMenu();
  };

  const settings = [
    {
      name: "Profile",
      handler: handleUserProfile
    },
    {
      name: "Logout",
      handler: handleUserLogout
    }
  ];

  return (
    <Box>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu}>
          <Avatar sx={{ width: "32px", height: "32px" }} />
        </IconButton>
      </Tooltip>
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
            <Typography textAlign="center">{setting.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default UserMenu;
