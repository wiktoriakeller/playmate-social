import React from "react";
import { StypedGameGrid } from "../../styled/components/games/StyledGameGrid";
import GamesList from "../games/GamesList";

const GamesTab = () => {
  return (
    <StypedGameGrid>
      <GamesList />
    </StypedGameGrid>
  );
};

export default GamesTab;
