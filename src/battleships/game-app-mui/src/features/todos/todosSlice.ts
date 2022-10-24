import {createAsyncThunk, createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import { RootState} from '../../app/store';
import {ITodo} from '../../types';


export interface TodosState {
    todosList: Array<ITodo>;
    status: 'normal' | 'hide_complete' ;
}

const initialState: TodosState = {
    todosList: [],
    status:'normal'
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
   addTodos: {
       reducer(state, action:PayloadAction<ITodo>) {
           state.todosList.push(action.payload)
       },
       prepare({content, completed}:Omit<ITodo, 'id'>){
           return{
               payload:{
                   id: nanoid(),
                   content,
                   completed
               }
           }
       }
   },

  updateTodos: (state, action:PayloadAction<String>) =>{
      const existingTodo = state.todosList.find(todo => todo.id === action.payload);
      if(existingTodo){
          existingTodo.completed = existingTodo.completed ? false : true;
      }
  }
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },

});

export const {addTodos, updateTodos} = todosSlice.actions;

export const selectTodosList = (state: RootState) => state.todos.todosList;

export default todosSlice.reducer;
