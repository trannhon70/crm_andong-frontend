import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import { usersReducer } from '../features/usersSlice';


export const store = configureStore({
  reducer: {
    counter: counterSlice,
    users: usersReducer,
  },
});

// Định nghĩa RootState và AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
