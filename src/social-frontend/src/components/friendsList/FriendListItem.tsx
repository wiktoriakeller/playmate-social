import Avatar from "@mui/material/Avatar";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import {
  IFriend,
  ILastChatMessage,
  selectSelectedFriend,
  setSelectedFriend
} from "../../slices/friendsListSlice";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { FriendData } from "../../styled/components/friends/FriendData";
import { StyledFriendsListItem } from "../../styled/components/friends/StyledFriendsListItem";

export interface IFriendsListItemProps {
  id: string;
  username: string;
  lastChatMessage?: ILastChatMessage;
  profilePictureUrl?: string;
}

const FriendListItem = (props: IFriendsListItemProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUserIdentity);
  const selectedFriend = useAppSelector(selectSelectedFriend);

  const getLastMessage = (message?: ILastChatMessage) => {
    if (!!message) {
      const senderName =
        currentUser.id === message.senderId ? "You" : message.senderUsername;
      return `${senderName}: ${message.content}`;
    }

    return "You:";
  };

  const setCurrentFriend = () => dispatch(setSelectedFriend(props as IFriend));

  return (
    <StyledFriendsListItem
      onClick={setCurrentFriend}
      isSelected={selectedFriend?.id === props.id}
    >
      <Avatar alt={props.username} src={props.profilePictureUrl ?? ""} />
      <FriendData isSelected={selectedFriend?.id === props.id}>
        <span>{props.username}</span>
        <span>{getLastMessage(props.lastChatMessage)}</span>
      </FriendData>
    </StyledFriendsListItem>
  );
};

export default FriendListItem;
