import { Skeleton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useRef, useState } from "react";
import { useLazyGetGameResultsQuery } from "../../api/gameResults/gameResultsApi";
import { useGetGamesQuery } from "../../api/games/gamesApi";
import { IGame } from "../../api/games/responses/getGamesResponse";
import { useAppDispatch } from "../../app/storeHooks";
import { useInitializeGame } from "../../hooks/useInitializeGame";
import { IFriend } from "../../slices/friendsListSlice";
import { setGameResults } from "../../slices/gameResultsSlice";
import FriendsListDialog from "./FriendsListDialog";
import GamesListItem from "./GamesListItem";

const GamesList = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetGamesQuery();
  const [getGameResults] = useLazyGetGameResultsQuery();
  const [dialogOpen, setDialogOpen] = useState(false);
  const selectedGame = useRef<IGame>();
  const { startGame } = useInitializeGame();

  useEffect(() => {
    getGameResults({}).then((response) => {
      if (!!response.data) {
        dispatch(setGameResults(response.data.data.results));
      }
    });
  }, [dispatch, getGameResults]);

  const onGameSelected = (game: IGame) => {
    selectedGame.current = game;
    setDialogOpen(true);
  };

  const onFriendSelected = (friend?: IFriend) => {
    setDialogOpen(false);
    if (!friend) {
      return;
    }

    startGame(friend, selectedGame.current);
  };

  return isLoading ? (
    <Grid container spacing={3}>
      <Grid xs={12} sm={4}>
        <Skeleton height={300} />
      </Grid>
      <Grid xs={12} sm={4}>
        <Skeleton height={300} />
      </Grid>
      <Grid xs={12} sm={4}>
        <Skeleton height={300} />
      </Grid>
    </Grid>
  ) : (
    <>
      <FriendsListDialog open={dialogOpen} onClose={onFriendSelected} />
      <Grid container spacing={3}>
        {data?.data?.games?.map((item) => (
          <Grid xs={12} sm={4} key={item.id}>
            <GamesListItem
              game={item}
              onSelect={onGameSelected}
              key={item.id}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default GamesList;
