import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from '../apis/user.api'



// First, create the thunk
export const fetchUserById = createAsyncThunk(
    'users/getByIdUser',
    async ( thunkAPI) => {
      const response = await userAPI.getByIdUser()
      return response.data.data
    },
  )
  
  interface UsersState {
    entities:any
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    invalidToken: boolean
  }

  const initialState = {
    entities: {},
    loading: 'idle',
    invalidToken: false,
  } satisfies UsersState as UsersState

  const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      setInvalidToken(state, action) {
        state.invalidToken = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchUserById.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = 'succeeded';
       
      })
    },
  })

  export const { setInvalidToken } = usersSlice.actions;
  export const usersReducer = usersSlice.reducer;