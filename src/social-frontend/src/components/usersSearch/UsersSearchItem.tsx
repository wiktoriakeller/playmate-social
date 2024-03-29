import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Tooltip
} from "@mui/material";
import { IUserSearchItem } from "../../api/users/responses/searchUsersResponse";
import { useAppDispatch } from "../../app/storeHooks";
import { sendFriendRequest } from "../../slices/userSearchSlice";
import { UserListItem } from "../../styled/components/userSearch/UserListItem";

const UsersSearchItem = (props: IUserSearchItem) => {
  const dispatch = useAppDispatch();

  const sendRequest = () => {
    dispatch(
      sendFriendRequest({
        ...props,
        isFriend: true
      })
    );
  };

  return (
    <UserListItem
      secondaryAction={
        props.isFriend || props.pendingRequest ? (
          <></>
        ) : (
          <Tooltip title="Add new friend" placement="right">
            <IconButton
              edge="end"
              aria-label="add friend"
              onClick={sendRequest}
            >
              <PersonAddIcon />
            </IconButton>
          </Tooltip>
        )
      }
    >
      <ListItemAvatar>
        <Avatar src={props.profilePictureUrl ?? ""} />
      </ListItemAvatar>
      <ListItemText
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis"
        }}
        primary={props.username}
      />
    </UserListItem>
  );
};

export default UsersSearchItem;
