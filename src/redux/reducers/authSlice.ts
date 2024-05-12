import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  id: number;
  fullName: string;
  username: string;
  email: string;
}

const initialState: AuthState = {
  id: 0,
  fullName: '',
  username: '',
  email: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state: AuthState, action: PayloadAction<AuthState>) => {
      // state = action.payload not work @@
      const {id, email, fullName, username} = action.payload;
      state.id = id;
      state.email = email;
      state.fullName = fullName;
      state.username = username;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setAuth} = authSlice.actions;

export default authSlice.reducer;
