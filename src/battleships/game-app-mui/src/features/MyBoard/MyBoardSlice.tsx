import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';



export interface IMyBoard  {
  
}

const initialState: IMyBoard = {
  
};

export const MyBoardSlice = createSlice({
  name: 'MyBoard',
  initialState,
  reducers: {
    // setMyBoardInfo: (state, action:PayloadAction<string>) =>{
    //   state.myBoardInfo = action.payload
    // },
  },

});

export const {} = MyBoardSlice.actions;

export const selectMyBoard = (state: RootState) => state.myBoard;

export default MyBoardSlice.reducer;
