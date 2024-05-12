import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export enum EProviderId {
  Email = 'email',
  Facebook = 'facebook',
  Google = 'google',
}
export interface AuthState {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatar: string;
  providerId: EProviderId;
}

const initialState: AuthState = {
  id: '',
  fullName: '',
  username: '',
  email: '',
  avatar: '',
  providerId: EProviderId.Email,
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
