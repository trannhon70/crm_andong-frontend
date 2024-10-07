import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from '../apis/user.api'
import { IGetPaging } from '../interface/roles'



// First, create the thunk
export const fetchUserById = createAsyncThunk(
    'users/getByIdUser',
    async ( thunkAPI) => {
      const response = await userAPI.getByIdUser()
      return response.data.data
    },
  )
  export const fetchGetPaging = createAsyncThunk(
    'users/getPaging',
    async ( query: IGetPaging ,thunkAPI ) => {
      const response = await userAPI.getPaging(query)
      return response.data.data
    },
  )

  export const fecthByIdUser = createAsyncThunk(
    'users/getIdByUser',
    async ( id: number ,thunkAPI ) => {
      const response = await userAPI.fecthByIdUser(id)
      return response.data.data
    },
  )
  
  
  interface UsersState {
    entities:any
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    invalidToken: boolean
    data:any,
    pageSize: number,
    pageIndex: number,
    total: number,
    totalPages: number,
    user: any
  }

  const initialState = {
    entities: {},
    loading: 'idle',
    invalidToken: false,
    data: [],
    pageSize: 5,
    pageIndex: 1,
    total: 0,
    totalPages: 0,
    user: {}
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
       
      });
      builder.addCase(fetchGetPaging.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.pageSize = action.payload.pageSize;
        state.pageIndex = action.payload.pageIndex;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.loading = 'succeeded';
      });
      builder.addCase(fecthByIdUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = 'succeeded';
      })
    },
  })

  export const { setInvalidToken } = usersSlice.actions;
  export const usersReducer = usersSlice.reducer;