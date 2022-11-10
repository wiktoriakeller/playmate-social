import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

const boardInit = {};
for(let i=1; i<11; i++){
  for(let j=1; j<11; j++){
    boardInit[i*11 + j] = "Item";
  }  
}

export interface IGame  {
    sendingEnabled: boolean,
    myBoardInfo: string,
    opponentBoardInfo: string,
    myBoardEnabled: boolean,
    opponentBoardEnabled: boolean,
    myBoardName: string,
    opponentBoardName: string,
    orientation: string,
    myBoardItemsStyles: object,
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
  myBoardItemsStyles: boardInit
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
      console.log('toggle orinettion');
      if (state.orientation === "HORIZONTAL"){
        state.orientation = "VERTICAL";
      } else{
        state.orientation = "HORIZONTAL";
      }
    },
    toggleFillingClassNameByIndex: (state, action:PayloadAction<number>) =>{
      if (state.myBoardItemsStyles[action.payload] === "Item"){
        state.myBoardItemsStyles[action.payload] = "Item MyBoardShipSquare";
      } else{
        state.myBoardItemsStyles[action.payload] = "Item";
      }
    },
  },

});

export const {setMyBoardInfo, setMyBoardEnabled, setMyBoardName, setOpponentBoardInfo, setOpponentBoardEnabled, setOpponentBoardName, toggleSending, toggleOrientation, toggleFillingClassNameByIndex} = GameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export default GameSlice.reducer;
