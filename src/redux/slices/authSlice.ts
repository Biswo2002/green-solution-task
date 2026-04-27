import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  isGuest: boolean;
  token: string | null;
};

const initialState: AuthState = {
  isGuest: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setGuest: (state, action: PayloadAction<boolean>) => {
      state.isGuest = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export const { setGuest, setToken } = authSlice.actions;
export const selectIsGuest = (s: { auth: AuthState }) => s.auth.isGuest;
export default authSlice.reducer;
