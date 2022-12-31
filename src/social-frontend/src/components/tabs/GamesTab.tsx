import { StyledGameGrid } from "../../styled/components/games/StyledGameGrid";
import GamesList from "../games/GamesList";

const GamesTab = () => {
  return (
    <StyledGameGrid>
      <GamesList />
    </StyledGameGrid>
  );
};

export default GamesTab;
