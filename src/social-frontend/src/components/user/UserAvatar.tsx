import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import { useAppSelector } from "../../app/storeHooks";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { StyledNormalUserAvatar } from "../../styled/components/user/StyledNormalUserAvatar";
import { StyledSmallUserAvatar } from "../../styled/components/user/StyledSmallUserAvatar";
import { StyledUserAvatarBox } from "../../styled/components/user/StyledUserAvatarBox";
import { StyledUsernameBox } from "../../styled/components/user/StyledUsernameBox";

export interface IUserAvatarProps {
  onAvatarClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const UserAvatar = (props: IUserAvatarProps) => {
  const user = useAppSelector(selectUserIdentity);

  return (
    <>
      <StyledNormalUserAvatar onClick={props.onAvatarClick}>
        <Tooltip title={`${user.email}`}>
          <StyledUserAvatarBox>
            <Avatar
              sx={{ width: "28px", height: "28px" }}
              alt={user.username}
              src={user.profilePictureUrl ?? ""}
            />
            <StyledUsernameBox>
              <Box
                sx={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  maxWidth: "250px"
                }}
              >
                {user.username}
              </Box>
              <ExpandMoreIcon fontSize="small" />
            </StyledUsernameBox>
          </StyledUserAvatarBox>
        </Tooltip>
      </StyledNormalUserAvatar>
      <StyledSmallUserAvatar onClick={props.onAvatarClick}>
        <Tooltip title={user.email}>
          <IconButton>
            <Avatar
              sx={{ width: "28px", height: "28px" }}
              alt={user.username}
              src={user.profilePictureUrl ?? ""}
            />
          </IconButton>
        </Tooltip>
      </StyledSmallUserAvatar>
    </>
  );
};

export default UserAvatar;
