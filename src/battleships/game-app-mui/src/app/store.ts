import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import WSConfigReducer from '../features/WSConfig/WSConfigSlice';
import ChatReducer from '../features/Chat/ChatSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    WSConfig: WSConfigReducer,
    chat: ChatReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

