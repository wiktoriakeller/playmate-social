import Avatar from "@mui/material/Avatar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
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
  logoPath?: string;
}

const FriendListItem = (props: IFriendsListItemProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUserIdentity);
  const selectedFriend = useAppSelector(selectSelectedFriend);

  const getLastMessage = () => {
    if (!!props.lastChatMessage) {
      const senderName =
        currentUser.id === props.lastChatMessage.senderId
          ? "You"
          : props.lastChatMessage.senderUsername;
      return `${senderName}: ${props.lastChatMessage.content}`;
    }

    return "";
  };

  return (
    <StyledFriendsListItem
      onClick={() => dispatch(setSelectedFriend(props as IFriend))}
      isSelected={selectedFriend?.id === props.id}
    >
      <Avatar alt={props.username} src={props.logoPath} />
      <FriendData isSelected={selectedFriend?.id === props.id}>
        <span>{props.username}</span>
        <span>{getLastMessage()}</span>
      </FriendData>
    </StyledFriendsListItem>
  );
};

export default FriendListItem;
