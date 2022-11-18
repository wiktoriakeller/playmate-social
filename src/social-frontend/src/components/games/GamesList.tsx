import { Skeleton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useRef, useState } from "react";
import { useGetGamesQuery } from "../../api/games/gamesApi";
import { IGame } from "../../api/games/responses/getGamesResponse";
import { useInitiateGame } from "../../app/useInitiateGame";
import { IFriend } from "../../slices/friendsListSlice";
import FriendsListDialog from "./FriendsListDialog";
import GamesListItem from "./GamesListItem";

const GamesList = () => {
  const { data, isLoading } = useGetGamesQuery({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const { StartGame } = useInitiateGame();
  let selectedGame = useRef<IGame>();

  const onGameSelected = (game: IGame) => {
    selectedGame.current = game;
    setDialogOpen(true);
  };

  const onFriendSelected = (friend?: IFriend) => {
    setDialogOpen(false);
    if (!friend) {
      return;
    }
    sendGameRequest(selectedGame.current, friend);
  };

  const sendGameRequest = (game: IGame, friend: IFriend) => {
    StartGame(friend, game);
  };

  return isLoading ? (
    <>
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
    </>
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
