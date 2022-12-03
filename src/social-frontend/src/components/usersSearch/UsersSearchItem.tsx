import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material";
import { useLazySendFriendRequestQuery } from "../../api/friends/friendsApi";
import { IUserSearchItem } from "../../api/users/responses/searchUsersResponse";
import { useAppDispatch } from "../../app/hooks";
import { updateUser } from "../../slices/userSearchSlice";
import { StyledUserSearchItem } from "../../styled/components/userSearch/StyledUserSearchItem";

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
    <StyledUserSearchItem>
      <ListItem
        secondaryAction={
          props.isFriend || props.pendingRequest ? (
            ""
          ) : (
            <IconButton
              edge="end"
              aria-label="add friend"
              onClick={sendRequest}
            >
              <PersonAddIcon />
            </IconButton>
          )
        }
      >
        <ListItemAvatar>
          <Avatar alt={props.username} />
        </ListItemAvatar>
        <ListItemText primary={props.username} />
      </ListItem>
    </StyledUserSearchItem>
  );
};

export default UsersSearchItem;
