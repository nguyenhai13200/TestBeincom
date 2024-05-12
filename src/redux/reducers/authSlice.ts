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
      Object.assign(state, action.payload);
    },
    resetAuth: (state: AuthState) => {
      Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {setAuth, resetAuth} = authSlice.actions;

export default authSlice.reducer;
