import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Tooltip
} from "@mui/material";
import { useLazySendFriendRequestQuery } from "../../api/friends/friendsApi";
import { IUserSearchItem } from "../../api/users/responses/searchUsersResponse";
import { useAppDispatch } from "../../app/hooks";
import { updateUser } from "../../slices/userSearchSlice";
import { UserListItem } from "../../styled/components/userSearch/UserListItem";

const UsersSearchItem = (props: IUserSearchItem) => {
  const dispatch = useAppDispatch();
  const [sendFriendRequest] = useLazySendFriendRequestQuery();

  const sendRequest = () => {
    dispatch(
      updateUser({
        ...props,
        isFriend: true
      })
    );
    sendFriendRequest({ username: props.username });
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
        <Avatar alt={props.username} />
      </ListItemAvatar>
      <ListItemText primary={props.username} />
    </UserListItem>
  );
};

export default UsersSearchItem;
