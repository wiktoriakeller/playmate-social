import { createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {IWSConfig} from '../../types';
import queryString from "query-string";
import {JsonValue} from '../../types/JsonValue';
// import * as dotenv from 'dotenv';
// dotenv.config();

export interface WSConfigState extends IWSConfig  {
    
}

const initialState: WSConfigState = {
    gameSessionId: queryString.parse(window.location.search).gameSessionId?.toString()||null,
    userId: queryString.parse(window.location.search).userId?.toString()||null,
    socketUrl: `ws://localhost:8000/battleships/ws/${queryString.parse(window.location.search).gameSessionId}/${queryString.parse(window.location.search).userId}`,
    stateLastParsedMessage: {
      
      data:{
      'my_board' :[],
      'opponent_board': []
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
