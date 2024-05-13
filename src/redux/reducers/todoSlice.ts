import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Todo} from 'src/components/ItemTodo';

export interface TodoState {
  listTodos: Todo[];
}

const initialState: TodoState = {
  listTodos: [],
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    getTodos: (state: TodoState, action: PayloadAction<TodoState>) => {
      Object.assign(state, action.payload);
    },
    addTodo: (state: TodoState, action: PayloadAction<Todo>) => {
      state.listTodos = [...state.listTodos, action.payload];
    },
    removeTodo: (state: TodoState, action: PayloadAction<Todo>) => {
      state.listTodos = state.listTodos.filter(t => t.id !== action.payload.id);
    },
    resetTodos: (state: TodoState) => {
      Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {getTodos, addTodo, removeTodo, resetTodos} = todoSlice.actions;

export default todoSlice.reducer;
