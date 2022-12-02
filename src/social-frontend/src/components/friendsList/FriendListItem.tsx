import Avatar from "@mui/material/Avatar";
import { useCallback } from "react";
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

  const getLastMessage = useCallback((message?: ILastChatMessage) => {
    if (!!message) {
      const senderName =
        currentUser.username === message.senderUsername
          ? "You"
          : message.senderUsername;
      return `${senderName}: ${message.content}`;
    }

    return "You:";
  }, []);

  const setCurrentFriend = useCallback(() => {
    dispatch(setSelectedFriend(props as IFriend));
  }, [props]);

  return (
    <StyledFriendsListItem
      onClick={setCurrentFriend}
      isSelected={selectedFriend?.id === props.id}
    >
      <Avatar alt={props.username} src={props.logoPath} />
      <FriendData isSelected={selectedFriend?.id === props.id}>
        <span>{props.username}</span>
        <span>{getLastMessage(props.lastChatMessage)}</span>
      </FriendData>
    </StyledFriendsListItem>
  );
};

export default FriendListItem;
