import { useEffect } from "react";
import { useLazyGetFriendsListQuery } from "../../api/friends/friendsApi";
import { useAppSelector } from "../../app/hooks";
import { selectFriendsListSearchPhrase } from "../../slices/friendsListSlice";
import { StyledFriendsList } from "../../styled/components/friends/StyledFriendsList";
import FriendListItem from "./FriendListItem";

const FriendsLits = () => {
  const friendsSearchPhrase = useAppSelector(selectFriendsListSearchPhrase);
  const [getFriendsListLazy, { data, isLoading }] =
    useLazyGetFriendsListQuery();

  useEffect(() => {
    getFriendsListLazy({});
  }, [friendsSearchPhrase]);

  return (
    <StyledFriendsList>
      {data?.data.friends.map((item) => (
        <FriendListItem {...item} key={item.id} />
      ))}
    </StyledFriendsList>
  );
};

export default FriendsLits;
