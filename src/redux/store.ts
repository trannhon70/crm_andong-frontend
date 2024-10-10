import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import { usersReducer } from '../features/usersSlice';
import { rolesReducer } from '../features/rolesSlice';
import { hospitalReducer } from '../features/hospitalSlice';
import { departmentReducer } from '../features/departmentSlice';
import { diseaseReducer } from '../features/diseaseSlice';
import { doctorReducer } from '../features/doctorSlice';


export const store = configureStore({
  reducer: {
    counter: counterSlice,
    users: usersReducer,
    roles: rolesReducer,
    hospital: hospitalReducer,
    department: departmentReducer,
    disease: diseaseReducer,
    doctor:doctorReducer
  },
});

// Định nghĩa RootState và AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
