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
    gameSessionId: queryString.parse(window.location.search).gameSesionId?.toString()||null,
    userId: queryString.parse(window.location.search).userId?.toString()||null,
    socketUrl: `ws://localhost:8000/battleships/ws/${queryString.parse(window.location.search).gameSesionId}/${queryString.parse(window.location.search).userId}`,
    stateLastParsedMessage: {}
};




export const WSConfigSlice = createSlice({
  name: 'WSConfig',
  initialState,
  reducers: {
    receiveMessageToState: (state, action:PayloadAction<Pick<IWSConfig, 'stateLastParsedMessage'>>) =>{
        state.stateLastParsedMessage = action.payload.stateLastParsedMessage||{}
    }
    
  },

});

export const {
  receiveMessageToState
} = WSConfigSlice.actions;

export const selectWSConfig = (state: RootState) => state.WSConfig;
export const selectStateLastParsedMessage = (state: RootState) => state.WSConfig.stateLastParsedMessage;


export default WSConfigSlice.reducer;
