import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isInitialized: false, // Will be set to true after first session check
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isInitialized = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    logout: state => {
      state.user = null;
      state.isLoading = false;
      state.isInitialized = true;
    },
  },
});

export const { setUser, setLoading, setInitialized, logout } =
  authSlice.actions;

export default authSlice.reducer;
