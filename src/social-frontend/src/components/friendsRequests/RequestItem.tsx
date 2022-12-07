import { IconButton, ListItem, Typography } from "@mui/material";
import {
  IFriendRequest,
  answerFriendRequests
} from "../../slices/friendRequestsSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch } from "../../app/hooks";
import { addFriend } from "../../slices/friendsListSlice";

const RequestItem = (props: IFriendRequest) => {
  const dispatch = useAppDispatch();

  const answerFriendRequest = (accept: boolean) => {
    dispatch(
      answerFriendRequests({
        accept: accept,
        requesterid: props.from.id,
        requestId: props.requestId
      })
    );
    if (accept) {
      dispatch(addFriend(props.from));
    }
  };

  return (
    <ListItem>
      <Typography textAlign="center">{props.from.username}</Typography>
      <IconButton onClick={() => answerFriendRequest(true)}>
        <CheckCircleIcon />
      </IconButton>
      <IconButton onClick={() => answerFriendRequest(false)}>
        <CancelIcon />
      </IconButton>
    </ListItem>
  );
};

export default RequestItem;
