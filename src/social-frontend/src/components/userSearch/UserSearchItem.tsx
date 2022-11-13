import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material";
import { IUserSearchItem } from "../../api/users/responses/ISearchUsersResponse";
import { StyledUserSearchItem } from "../../styled/components/userSearch/StyledUserSearchItem";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useAppDispatch } from "../../app/hooks";
import { updateUser } from "../../slices/userSearchSlice";
import { useLazySendFriendRequestQuery } from "../../api/friends/friendsApi";

const UserSearchItem = (props: IUserSearchItem) => {
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

export default UserSearchItem;
