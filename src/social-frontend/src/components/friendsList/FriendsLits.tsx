import { Avatar, Skeleton } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { useLazyGetFriendsListQuery } from "../../api/friends/friendsApi";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import {
  selectFriendsList,
  selectFriendsListSearchPhrase,
  selectSelectedFriend,
  setFriendsList,
  setSelectedFriend
} from "../../slices/friendsListSlice";
import { openSnackbar, SnackbarSeverity } from "../../slices/snackbarSlice";
import { SkeletonsContainer } from "../../styled/components/common/SkeletonsContainer";
import { StyledFriendsList } from "../../styled/components/friends/StyledFriendsList";
import FriendListItem from "./FriendListItem";

const FriendsLits = () => {
  const dispatch = useAppDispatch();
  const friendsSearchPhrase = useAppSelector(selectFriendsListSearchPhrase);
  const userFriends = useAppSelector(selectFriendsList);
  const [getFriendsListLazy, { isLoading }] = useLazyGetFriendsListQuery();
  const selectedFriend = useAppSelector(selectSelectedFriend);
  const isFirstRender = useRef<boolean>(true);

  const skeletons = useMemo(() => {
    const skeletons: React.ReactNode[] = [];
    for (let i = 0; i < 6; i++) {
      skeletons.push(
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
    return skeletons;
  }, []);

  useEffect(() => {
    getFriendsListLazy(
      {
        search: friendsSearchPhrase
      },
      true
    )
      .unwrap()
      .then((response) => {
        if (!!response.data) {
          dispatch(setFriendsList(response.data.friends));

          if (isFirstRender.current) {
            if (response.data.friends.length > 0 && selectedFriend === null) {
              dispatch(setSelectedFriend(response.data.friends[0]));
            }

            isFirstRender.current = false;
          }
        }
      })
      .catch((error: { status: string | number }) => {
        dispatch(
          openSnackbar({
            message: "Could not load friends list",
            severity: SnackbarSeverity.Error,
            status: error.status
          })
        );
      });
  }, [friendsSearchPhrase, selectedFriend, dispatch, getFriendsListLazy]);

  return (
    <StyledFriendsList>
      {!!userFriends && !isLoading
        ? userFriends.map((item) => <FriendListItem {...item} key={item.id} />)
        : skeletons.map((skeleton) => skeleton)}
    </StyledFriendsList>
  );
};

export default FriendsLits;
