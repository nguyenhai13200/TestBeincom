import {configureStore} from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import todoSlice from './reducers/todoSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    todos: todoSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootReduxState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
