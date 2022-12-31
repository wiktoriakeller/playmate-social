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
import { useState } from "react";
import { IGame } from "../../api/games/responses/getGamesResponse";
import GameResultsPage from "../gameResults/GameResultsPage";

export interface IGameListItemProps {
  game: IGame;
  onSelect: (gameName: IGame) => void;
}

const GamesListItem = (props: IGameListItemProps) => {
  const selectGame = () => {
    props.onSelect(props.game);
  };

  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const handleClick = () => {
    setDetailsDialogOpen(true);
  };

  const handleClose = () => {
    setDetailsDialogOpen(false);
  };

  return (
    <Card>
      <CardMedia component="img" height="150" image="" alt="Game image" />
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
        <Tooltip title="Game results">
          <IconButton onClick={handleClick} color="secondary">
            <BarChartIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
        <GameResultsPage
          game={props.game}
          handleClose={handleClose}
          open={Boolean(detailsDialogOpen)}
        />
      </CardActions>
    </Card>
  );
};

export default GamesListItem;
