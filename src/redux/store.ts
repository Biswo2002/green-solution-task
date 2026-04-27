import { configureStore } from '@reduxjs/toolkit';
import appConfig from './slices/appConfigSlice';
import auth from './slices/authSlice';

export const store = configureStore({
  reducer: {
    appConfig,
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
