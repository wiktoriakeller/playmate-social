import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IGameResult {
  id: string;
  date: string;
  winnerId: string;
  loserId: string;
}

export interface IGameResultsDictionary {
  [key: string]: IGameResult[];
}

export interface IGameResultsState {
  gameResultsState: IGameResultsDictionary;
}

const gameResultsInitialState: IGameResultsState = {
  gameResultsState: {}
};

export const gameResultsSlice = createSlice({
  name: "gameResults",
  initialState: gameResultsInitialState,
  reducers: {
    setGameResults(
      state: IGameResultsState,
      action: PayloadAction<IGameResultsDictionary>
    ) {
      state.gameResultsState = action.payload;
    }
  }
});

export const { setGameResults } = gameResultsSlice.actions;

export const selectGameResults = (state: RootState): IGameResultsDictionary =>
  state.gameResults.gameResultsState;

export default gameResultsSlice.reducer;
