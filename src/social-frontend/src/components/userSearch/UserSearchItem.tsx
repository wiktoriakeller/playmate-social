import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material";
import { IUserSearchItem } from "../../api/users/responses/searchUsersResponse";
import { StyledUserSearchItem } from "../../styled/components/userSearch/StyledUserSearchItem";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useAppDispatch } from "../../app/hooks";
import { sendFriendRequest } from "../../slices/userSearchSlice";

const UserSearchItem = (props: IUserSearchItem) => {
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
