import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import WSConfigReducer from '../features/WSConfig/WSConfigSlice';
import ChatReducer from '../features/Chat/ChatSlice';
import GameReducer from '../features/Game/GameSlice';
import MyBoardReducer from '../features/MyBoard/MyBoardSlice';
import OpponentBoardReducer from '../features/OpponentBoard/OpponentBoardSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    WSConfig: WSConfigReducer,
    chat: ChatReducer,
    game: GameReducer,
    myBoard: MyBoardReducer,
    opponentBoard: OpponentBoardReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

