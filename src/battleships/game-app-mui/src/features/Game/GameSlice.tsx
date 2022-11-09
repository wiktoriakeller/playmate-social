import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';


export interface IGame  {
    sendingEnabled: boolean,
    myBoardInfo: string,
    opponentBoardInfo: string,
    myBoardEnabled: boolean,
    opponentBoardEnabled: boolean,
    myBoardName: string,
    opponentBoardName: string,
    orientation: string,
}

const initialState: IGame = {
  sendingEnabled: true,
  myBoardInfo: "START",
  opponentBoardInfo: "START",
  myBoardEnabled: true,
  opponentBoardEnabled: false,
  myBoardName: "NAME",
  opponentBoardName: "NAME",
  orientation: "HORIZONTAL",
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
    setMyBoardName: (state, action:PayloadAction<string>) =>{
      state.myBoardName = action.payload
    },
    setMyBoardEnabled: (state, action:PayloadAction<boolean>) =>{
      state.myBoardEnabled = action.payload
    },
    setOpponentBoardInfo: (state, action:PayloadAction<string>) =>{
      state.opponentBoardInfo = action.payload
    },
    setOpponentBoardName: (state, action:PayloadAction<string>) =>{
      state.opponentBoardName = action.payload
    },
    setOpponentBoardEnabled: (state, action:PayloadAction<boolean>) =>{
      state.opponentBoardEnabled = action.payload
    },
    toggleOrientation: (state) =>{
      if (state.orientation == "HORIZONTAL"){
        state.orientation = "VERTICAL";
      } else{
        state.orientation = "HORIZONTAL";
      }
    },
  },

});

export const {setMyBoardInfo, setMyBoardEnabled, setMyBoardName, setOpponentBoardInfo, setOpponentBoardEnabled, setOpponentBoardName, toggleSending, toggleOrientation} = GameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export default GameSlice.reducer;
