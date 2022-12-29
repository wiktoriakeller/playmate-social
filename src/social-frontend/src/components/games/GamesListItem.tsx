import { Button, CardActions, CardContent, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { IGame } from "../../api/games/responses/getGamesResponse";

export interface IGameListItemProps {
  game: IGame;
  onSelect: (gameName: IGame) => void;
}

const GamesListItem = (props: IGameListItemProps) => {
  const selectGame = () => {
    props.onSelect(props.game);
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
        <Button size="large" onClick={selectGame}>
          Play
        </Button>
      </CardActions>
    </Card>
  );
};

export default GamesListItem;
