import { Avatar, Skeleton } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useLazyGetFriendsListQuery } from "../../api/friends/friendsApi";
import { useAppSelector } from "../../app/hooks";
import { selectFriendsListSearchPhrase } from "../../slices/friendsListSlice";
import { StyledFriendsList } from "../../styled/components/friends/StyledFriendsList";
import { SkeletonsContainer } from "../../styled/components/mui/SkeletonsContainer";
import FriendListItem from "./FriendListItem";

const FriendsLits = () => {
  const friendsSearchPhrase = useAppSelector(selectFriendsListSearchPhrase);
  const [getFriendsListLazy, { data, isLoading }] =
    useLazyGetFriendsListQuery();
  const skeletons = useMemo(() => {
    const jsxElements = [];
    for (let i = 0; i < 6; i++) {
      jsxElements.push(
        <SkeletonsContainer childrenHeight={70}>
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
          <SkeletonsContainer childrenHeight={15} flexDirection="column">
            <Skeleton width="80%" />
            <Skeleton width="40%" />
          </SkeletonsContainer>
        </SkeletonsContainer>
      );
    }
    return jsxElements;
  }, []);

  useEffect(() => {
    getFriendsListLazy({
      search: friendsSearchPhrase
    });
  }, [friendsSearchPhrase]);

  if (isLoading) {
    return (
      <StyledFriendsList>
        {skeletons.map((skeleton) => skeleton)}
      </StyledFriendsList>
    );
  }

  return (
    <StyledFriendsList>
      {data?.data.friends.map((item) => (
        <FriendListItem {...item} key={item.id} />
      ))}
    </StyledFriendsList>
  );
};

export default FriendsLits;
