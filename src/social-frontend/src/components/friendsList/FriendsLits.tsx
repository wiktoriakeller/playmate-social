import { Avatar, Skeleton } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { useLazyGetFriendsListQuery } from "../../api/friends/friendsApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectFriendsList,
  selectFriendsListSearchPhrase,
  setFriendsList,
  setSelectedFriend
} from "../../slices/friendsListSlice";
import { openSnackbar, SnackbarSeverity } from "../../slices/snackbarSlice";
import { StyledFriendsList } from "../../styled/components/friends/StyledFriendsList";
import { SkeletonsContainer } from "../../styled/components/mui/SkeletonsContainer";
import FriendListItem from "./FriendListItem";

const FriendsLits = () => {
  const dispatch = useAppDispatch();
  const friendsSearchPhrase = useAppSelector(selectFriendsListSearchPhrase);
  const userFriends = useAppSelector(selectFriendsList);
  const [getFriendsListLazy, { isLoading, data }] =
    useLazyGetFriendsListQuery();
  const isFirstRender = useRef<boolean>(true);

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
    getFriendsListLazy(
      {
        search: friendsSearchPhrase
      },
      true
    )
      .unwrap()
      .catch((error: { status: string | number }) => {
        dispatch(
          openSnackbar({
            message: "Could not load friends list",
            severity: SnackbarSeverity.Error,
            status: error.status
          })
        );
      });
  }, [friendsSearchPhrase]);

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setFriendsList(data.data?.friends));

      if (isFirstRender.current) {
        if (data.data?.friends.length > 0) {
          dispatch(setSelectedFriend(data.data.friends[0]));
        }

        isFirstRender.current = false;
      }
    }
  }, [data]);

  if (isLoading) {
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
