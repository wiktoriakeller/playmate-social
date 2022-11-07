import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "../app/store";

export enum TabName {
  Chat = "Chat",
  Games = "Games",
  Users = "Users"
}

export interface ITabState {
  name: TabName;
  index: number;
}

const tabInitialState: ITabState = {
  name: TabName.Chat,
  index: 0
};

export const tabSlice = createSlice({
  name: "tab",
  initialState: tabInitialState,
  reducers: {
    setTabIndex(state: ITabState, action: PayloadAction<ITabState>) {
      _.assign(state, action.payload);
    }
  }
});

export const { setTabIndex } = tabSlice.actions;

export const selectCurrentTab = (state: RootState): ITabState => state.tab;

export default tabSlice.reducer;
