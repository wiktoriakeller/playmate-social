import {
  Avatar,
  DialogContent,
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
import { StyledDialogContent } from "../../styled/components/common/StyledDialogContent";

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
    <StyledDialog
      onClose={handleClose}
      open={props.open}
      scroll="paper"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Select opponent</DialogTitle>
      <StyledDialogContent sx={{ maxHeight: "300px" }}>
        <List>
          {friends?.data.friends.map((friend) => (
            <ListItem
              onClick={() => handleListItemClick(friend)}
              key={friend.id}
            >
              <ListItemAvatar>
                <Avatar src={friend.profilePictureUrl ?? ""} />
              </ListItemAvatar>
              <ListItemText primary={friend.username} />
            </ListItem>
          ))}
        </List>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default FriendsListDialog;
