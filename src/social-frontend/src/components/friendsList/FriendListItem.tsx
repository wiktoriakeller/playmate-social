import { useMediaQuery } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import {
  IFriend,
  ILastChatMessage,
  selectSelectedFriend,
  setSelectedFriend
} from "../../slices/friendsListSlice";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { selectWindowSizeState } from "../../slices/windowSizeSlice";
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
  const navigate = useNavigate();
  const windowSize = useAppSelector(selectWindowSizeState);
  const currentUser = useAppSelector(selectUserIdentity);
  const selectedFriend = useAppSelector(selectSelectedFriend);
  const deviceWithPointer = useMediaQuery(
    "only screen and (hover: none) and (pointer: coarse)"
  );

  const getLastMessage = (message?: ILastChatMessage) => {
    if (!!message) {
      const senderName =
        currentUser.id === message.senderId ? "You" : message.senderUsername;
      return `${senderName}: ${message.content}`;
    }

    return "You:";
  };

  const handleFriendClick = () => {
    dispatch(setSelectedFriend(props as IFriend));

    if (deviceWithPointer || windowSize.matchesSmallWidth) {
      navigate("/chats");
    }
  };

  return (
    <StyledFriendsListItem
      onClick={handleFriendClick}
      isSelected={selectedFriend?.id === props.id}
    >
      <Avatar src={props.profilePictureUrl ?? ""} />
      <FriendData isSelected={selectedFriend?.id === props.id}>
        <span>{props.username}</span>
        <span>{getLastMessage(props.lastChatMessage)}</span>
      </FriendData>
    </StyledFriendsListItem>
  );
};

export default FriendListItem;
