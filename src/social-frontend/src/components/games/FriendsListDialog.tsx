import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton
} from "@mui/material";
import { useEffect } from "react";
import { useLazyGetFriendsListQuery } from "../../api/friends/friendsApi";
import { IFriend } from "../../slices/friendsListSlice";

export interface FriendsListDialogProps {
  open: boolean;
  onClose: (value?: IFriend) => void;
}

const FriendsListDialog = (props: FriendsListDialogProps) => {
  const [getFriendsListLazy, { data: friends, isLoading }] =
    useLazyGetFriendsListQuery();

  useEffect(() => {
    getFriendsListLazy({ search: "" }, true);
  }, [getFriendsListLazy]);

  const handleListItemClick = (value: IFriend) => {
    props.onClose(value);
  };

  const handleClose = () => {
    props.onClose();
  };

  if (isLoading) {
    <>
      <Skeleton height={70} />
    </>;
  }

  return (
    <Dialog onClose={handleClose} open={props.open}>
      <DialogTitle>Select opponent</DialogTitle>
      <List>
        {friends?.data.friends.map((friend) => (
          <ListItem onClick={() => handleListItemClick(friend)} key={friend.id}>
            <ListItemAvatar>
              <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText primary={friend.username} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default FriendsListDialog;
