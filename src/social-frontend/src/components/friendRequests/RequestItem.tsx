import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Avatar, Box, IconButton, ListItem, Typography } from "@mui/material";
import { useAppDispatch } from "../../app/storeHooks";
import {
  answerFriendRequests,
  IFriendRequest
} from "../../slices/friendRequestsSlice";
import { addFriend } from "../../slices/friendsListSlice";
import { ListDivider } from "../../styled/components/notifications/ListDivider";
import { NotificationsButtons } from "../../styled/components/notifications/NotificationsButtons";
import { UserReuquestData } from "../../styled/components/notifications/UserRequestData";

export interface IRequestItemProps {
  request: IFriendRequest;
  isLast: boolean;
}

const RequestItem = (props: IRequestItemProps) => {
  const dispatch = useAppDispatch();

  const answerFriendRequest = (accepted: boolean) => {
    dispatch(
      answerFriendRequests({
        accept: accepted,
        requesterId: props.request.from.id,
        requestId: props.request.requestId
      })
    );

    if (accepted) {
      dispatch(addFriend(props.request.from));
    }
  };

  return (
    <Box>
      <ListItem>
        <UserReuquestData>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px"
            }}
          >
            <Avatar
              alt={props.request.from.username}
              src={props.request.from.profilePictureUrl ?? ""}
            />
            <Typography textAlign="center">
              {props.request.from.username}
            </Typography>
          </Box>
        </UserReuquestData>
        <NotificationsButtons>
          <IconButton onClick={() => answerFriendRequest(true)}>
            <CheckCircleIcon />
          </IconButton>
          <IconButton onClick={() => answerFriendRequest(false)}>
            <CancelIcon />
          </IconButton>
        </NotificationsButtons>
      </ListItem>
      {props.isLast ? <></> : <ListDivider variant="middle" />}
    </Box>
  );
};

export default RequestItem;
