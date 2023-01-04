import {
  Avatar,
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
import { StyledDialog } from "../../styled/components/common/StyledDialog";

export interface FriendsListDialogProps {
  onClose: (value?: IFriend) => void;
  open: boolean;
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
    <StyledDialog onClose={handleClose} open={props.open} scroll="paper">
      <DialogTitle>Select opponent</DialogTitle>
      <List>
        {friends?.data.friends.map((friend) => (
          <ListItem onClick={() => handleListItemClick(friend)} key={friend.id}>
            <ListItemAvatar>
              <Avatar
                alt={friend.username}
                src={friend.profilePictureUrl ?? ""}
              />
            </ListItemAvatar>
            <ListItemText primary={friend.username} />
          </ListItem>
        ))}
      </List>
    </StyledDialog>
  );
};

export default FriendsListDialog;
