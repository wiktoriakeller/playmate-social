import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';


export interface IGame  {
    myBoardInfo: string,
    opponentBoardInfo: string
}

const initialState: IGame = {
  myBoardInfo: "START",
  opponentBoardInfo: "START"
};

export const GameSlice = createSlice({
  name: 'Game',
  initialState,
  reducers: {
    setMyBoardInfo: (state, action:PayloadAction<string>) =>{
      state.myBoardInfo = action.payload
    },
    setOpponentBoardInfo: (state, action:PayloadAction<string>) =>{
      state.opponentBoardInfo = action.payload
    },
  },

});

export const {setMyBoardInfo, setOpponentBoardInfo} = GameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export default GameSlice.reducer;
