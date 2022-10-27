import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {IWSConfig} from '../../types';


export interface IChat  {
    sendingEnabled: boolean
}

const initialState: IChat = {
    sendingEnabled: true
};

export const ChatSlice = createSlice({
  name: 'Chat',
  initialState,
  reducers: {
    toggleSending: (state, action:PayloadAction<boolean>) =>{
      state.sendingEnabled = action.payload
    }
  },

});

export const {toggleSending} = ChatSlice.actions;

export const selectChat = (state: RootState) => state.chat;

export default ChatSlice.reducer;
