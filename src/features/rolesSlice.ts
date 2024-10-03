
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { rolesAPI } from '../apis/roles.api'
import { IGetPaging } from '../interface/roles'

export const fetchGetPaging = createAsyncThunk(
    'roles/getPaging',
    async ( query: IGetPaging ,thunkAPI ) => {
      const response = await rolesAPI.getPaging(query)
      return response.data.data
    },
  )

  interface RoleState {
    data:any,
    pageSize: number,
    pageIndex: number,
    total: number,
    totalPages: number,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  }

  const initialState = {
    data: {},
    pageSize: 5,
    pageIndex: 1,
    total: 0,
    totalPages: 0,
    loading: 'idle',
  } satisfies RoleState as RoleState


  const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
    //   setInvalidToken(state, action) {
    //     state.invalidToken = action.payload;
    //   },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchGetPaging.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.pageSize = action.payload.pageSize;
        state.pageIndex = action.payload.pageIndex;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.loading = 'succeeded';
       
      })
    },
  })

  export const {  } = rolesSlice.actions;
  export const rolesReducer = rolesSlice.reducer;