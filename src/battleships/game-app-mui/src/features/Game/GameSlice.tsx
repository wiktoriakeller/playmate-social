import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';


export interface IGame  {
    sendingEnabled: boolean,
    myBoardInfo: string,
    opponentBoardInfo: string,
}

const initialState: IGame = {
  sendingEnabled: true,
  myBoardInfo: "START",
  opponentBoardInfo: "START"
};

export const GameSlice = createSlice({
  name: 'Game',
  initialState,
  reducers: {
    toggleSending: (state, action:PayloadAction<boolean>) =>{
      state.sendingEnabled = action.payload
    },
    setMyBoardInfo: (state, action:PayloadAction<string>) =>{
      state.myBoardInfo = action.payload
    },
    setOpponentBoardInfo: (state, action:PayloadAction<string>) =>{
      state.opponentBoardInfo = action.payload
    },
  },

});

export const {setMyBoardInfo, setOpponentBoardInfo, toggleSending} = GameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export default GameSlice.reducer;
