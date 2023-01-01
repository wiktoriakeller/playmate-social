import BarChartIcon from "@mui/icons-material/BarChart";
import {
  Button,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { useCallback, useState } from "react";
import { IGame } from "../../api/games/responses/getGamesResponse";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import { selectGameResults } from "../../slices/gameResultsSlice";
import { openSnackbar, SnackbarSeverity } from "../../slices/snackbarSlice";
import GameResultsDialog from "../gameResults/GameResultsDialog";

export interface IGameListItemProps {
  game: IGame;
  onSelect: (gameName: IGame) => void;
}

const GamesListItem = (props: IGameListItemProps) => {
  const dispatch = useAppDispatch();
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const results = useAppSelector(selectGameResults)[props.game.id];

  const selectGame = () => {
    props.onSelect(props.game);
  };

  const handleClickResultsDialog = useCallback(() => {
    if (results !== undefined && results.length > 0) {
      setDetailsDialogOpen(true);
    } else {
      dispatch(
        openSnackbar({
          message: "Not enough data to display statistics!",
          severity: SnackbarSeverity.Info
        })
      );
    }
  }, [dispatch, results]);

  const handleCloseResultsDialog = useCallback(() => {
    setDetailsDialogOpen(false);
  }, []);

  return (
    <Card>
      <CardMedia
        component="img"
        height="150"
        image={props.game.imageUrl}
        alt="Game image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.game.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.game.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="large"
          onClick={selectGame}
          color="secondary"
          sx={{ marginRight: "auto" }}
        >
          Play
        </Button>
        <Tooltip title="Game statistics">
          <IconButton onClick={handleClickResultsDialog} color="secondary">
            <BarChartIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
        <GameResultsDialog
          game={props.game}
          handleClose={handleCloseResultsDialog}
          open={Boolean(detailsDialogOpen)}
        />
      </CardActions>
    </Card>
  );
};

export default GamesListItem;
