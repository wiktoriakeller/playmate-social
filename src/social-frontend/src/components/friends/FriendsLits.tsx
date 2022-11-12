import { StyledFriendsList } from "../../styled/components/friends/StyledFriendsList";
import FriendListItem, { IFriendsListItemProps } from "./FriendListItem";

const FriendsLits = () => {
  const friends: IFriendsListItemProps[] = [
    {
      id: "1",
      username: "Albert",
      lastMessegeSender: "You",
      lastMessage: "xd"
    },
    {
      id: "2",
      username: "Ania",
      lastMessegeSender: "You",
      lastMessage: "xd"
    },
    {
      id: "3",
      username: "Jhon",
      lastMessegeSender: "You",
      lastMessage: "xd"
    },
    {
      id: "4",
      username: "Marek",
      lastMessegeSender: "You",
      lastMessage: "xd"
    },
    {
      id: "5",
      username: "Michael",
      lastMessegeSender: "You",
      lastMessage: "xd"
    },
    {
      id: "6",
      username: "Naruto",
      lastMessegeSender: "You",
      lastMessage: "xd"
    },
    {
      id: "7",
      username: "Naruto",
      lastMessegeSender: "You",
      lastMessage: "xd"
    }
  ];

  return (
    <StyledFriendsList>
      {friends.map((item) => (
        <FriendListItem {...item} key={item.id} />
      ))}
    </StyledFriendsList>
  );
};

export default FriendsLits;
