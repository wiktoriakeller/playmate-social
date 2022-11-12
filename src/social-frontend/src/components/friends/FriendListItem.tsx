import Avatar from "@mui/material/Avatar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectSelectedFriend,
  setSelectedFriend
} from "../../slices/friendsListSlice";
import { FriendData } from "../../styled/components/friends/FriendData";
import { StyledFriendsListItem } from "../../styled/components/friends/StyledFriendsListItem";

export interface IFriendsListItemProps {
  id: string;
  username: string;
  lastMessage: string;
  lastMessegeSender: string;
  logoPath?: string;
}

const FriendListItem = (props: IFriendsListItemProps) => {
  const dispatch = useAppDispatch();
  const selectedFriend = useAppSelector(selectSelectedFriend);

  return (
    <StyledFriendsListItem
      onClick={() => dispatch(setSelectedFriend(props))}
      isSelected={selectedFriend?.id === props.id}
    >
      <Avatar alt={props.username} src={props.logoPath} />
      <FriendData isSelected={selectedFriend?.id === props.id}>
        <span>{props.username}</span>
        <span>{`${props.lastMessegeSender}: ${props.lastMessage}`}</span>
      </FriendData>
    </StyledFriendsListItem>
  );
};

export default FriendListItem;
