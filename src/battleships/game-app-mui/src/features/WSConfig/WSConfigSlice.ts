import { createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {IWSConfig} from '../../types';
import queryString from "query-string";
import {JsonValue} from '../../types/JsonValue';
// import * as dotenv from 'dotenv';
// dotenv.config();

export interface WSConfigState extends IWSConfig  {
    
}
const paramMaxShipLength = 2; //TODO
const boardInit = {};
for(let i=1; i<11; i++){
  for(let j=1; j<11; j++){
    boardInit[i*11 + j] = 1;
  }  
}
const hPlacesInit = [];
for(let i=1; i < 11 ; i++){
  for(let j=1; j < 11 - paramMaxShipLength + 1; j++){
    hPlacesInit.push(i * 11 + j)
  }  
}
const vPlacesInit = [];
for(let i=1; i < 11 - paramMaxShipLength + 1; i++){
  for(let j=1; j < 11 ; j++){
    vPlacesInit.push(i * 11 + j)
  }  
}

const initialState: WSConfigState = {
    gameSessionId: queryString.parse(window.location.search).gameSessionId?.toString()||null,
    userId: queryString.parse(window.location.search).userId?.toString()||null,
    socketUrl: `ws://localhost:8000/battleships/ws/${queryString.parse(window.location.search).gameSessionId}/${queryString.parse(window.location.search).userId}`,
    stateLastParsedMessage: {
      
      'data':{
        'my_board': boardInit,
        'opponent_board': boardInit,
        'my_board_info': "START",
        'opponent_board_info': "START",
        'my_board_enabled': true,
        'opponent_board_enabled': false,
        'my_board_name': "NAME",
        'opponent_board_name': "NAME",
        'next_ship_length_to_set': paramMaxShipLength, // TODO
        'h_allowed_places' : hPlacesInit,
        'v_allowed_places' : vPlacesInit
      }
  }
};

export const WSConfigSlice = createSlice({
  name: 'WSConfig',
  initialState,
  reducers: {
    receiveMessageToState: (state, action:PayloadAction<object>) =>{
        state.stateLastParsedMessage = action.payload
    }
    
  },

});

export const {
  receiveMessageToState
} = WSConfigSlice.actions;

export const selectWSConfig = (state: RootState) => state.WSConfig;
export const selectStateLastParsedMessage = (state: RootState) => state.WSConfig.stateLastParsedMessage;


export default WSConfigSlice.reducer;
