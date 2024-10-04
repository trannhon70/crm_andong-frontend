import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import { usersReducer } from '../features/usersSlice';
import { rolesReducer } from '../features/rolesSlice';
import { hospitalReducer } from '../features/hospitalSlice';


export const store = configureStore({
  reducer: {
    counter: counterSlice,
    users: usersReducer,
    roles: rolesReducer,
    hospital: hospitalReducer
    
  },
});

// Định nghĩa RootState và AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
