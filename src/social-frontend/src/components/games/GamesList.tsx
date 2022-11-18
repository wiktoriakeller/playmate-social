import { Skeleton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
import { useLazyInitiateGameQuery } from "../../api/games/gameIntegrationApi";
import { useGetGamesQuery } from "../../api/games/gamesApi";
import { IGame } from "../../api/games/responses/getGamesResponse";
import { IFriend } from "../../slices/friendsListSlice";
import FriendsListDialog from "./FriendsListDialog";
import GamesListItem from "./GamesListItem";

const GamesList = () => {
  const { data, isLoading } = useGetGamesQuery({});
  const [dialogOpen, setDialogOpen] = useState(false);
  let selectedGame = null;

  const [initializeGame, { data: gameUrls, isLoading: gameLoading }] =
    useLazyInitiateGameQuery();

  const onGameSelected = (game: IGame) => {
    selectedGame = game;
    setDialogOpen(true);
  };

  const onFriendSelected = (friend?: IFriend) => {
    setDialogOpen(false);
    if (!friend) {
      return;
    }
    sendGameRequest(selectedGame, friend);
  };

  const sendGameRequest = (game: IGame, friend: IFriend) => {};

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
        {data.data.games?.map((item) => (
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
