import { Avatar, Skeleton } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useLazyGetFriendsListQuery } from "../../api/friends/friendsApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectFriendsList,
  selectFriendsListSearchPhrase,
  setFriendsList
} from "../../slices/friendsListSlice";
import { StyledFriendsList } from "../../styled/components/friends/StyledFriendsList";
import { SkeletonsContainer } from "../../styled/components/mui/SkeletonsContainer";
import FriendListItem from "./FriendListItem";

const FriendsLits = () => {
  const dispatch = useAppDispatch();
  const friendsSearchPhrase = useAppSelector(selectFriendsListSearchPhrase);
  const userFriends = useAppSelector(selectFriendsList);
  const [getFriendsListLazy, { isLoading, isFetching }] =
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
    }).then((response) => {
      dispatch(setFriendsList(response?.data?.data.friends));
    });
  }, [friendsSearchPhrase]);

  if (isLoading || isFetching) {
    return (
      <StyledFriendsList>
        {skeletons.map((skeleton) => skeleton)}
      </StyledFriendsList>
    );
  }

  return (
    <StyledFriendsList>
      {userFriends?.map((item) => (
        <FriendListItem {...item} key={item.id} />
      ))}
    </StyledFriendsList>
  );
};

export default FriendsLits;
