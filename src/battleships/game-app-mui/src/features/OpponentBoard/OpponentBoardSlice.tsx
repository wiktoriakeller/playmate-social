import { createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';


export interface IOpponentBoard  {
    
}
const initialState: IOpponentBoard = {

};

export const OpponentBoardSlice = createSlice({
  name: 'OpponentBoard',
  initialState,
  reducers: {
    // setMyBoardInfo: (state, action:PayloadAction<string>) =>{
    //   state.myBoardInfo = action.payload
    // },
  },

});

// export const {} = OpponentBoardSlice.actions;

export const selectOpponentBoard = (state: RootState) => state.opponentBoard;

export default OpponentBoardSlice.reducer;
