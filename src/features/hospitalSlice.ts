import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IGetPaging } from '../interface/roles'
import { hospitalAPI } from '../apis/hospital.api'

export const fetchGetPaging = createAsyncThunk(
    'hospital/getPaging',
    async ( query: IGetPaging ,thunkAPI ) => {
      const response = await hospitalAPI.getPaging(query)
      return response.data.data
    },
  )

  export const getAllHospital = createAsyncThunk(
    'hospital/getall',
    async ( thunkAPI ) => {
      const response = await hospitalAPI.getAllHospital()
      return response.data.data
    },
  )

  export const getByIdHospital = createAsyncThunk(
    'hospital/getByIdHospital',
    async (hospitalId : number, thunkAPI ) => {
      const response = await hospitalAPI.getByIdHospital(hospitalId)
      return response.data.data
    },
  )

  interface HospitalState {
    data:any,
    pageSize: number,
    pageIndex: number,
    total: number,
    totalPages: number,
    hospital: any,
    hospitalById: any,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  }

  const initialState = {
    data: [],
    pageSize: 5,
    pageIndex: 1,
    total: 0,
    totalPages: 0,
    hospital: [],
    hospitalById: {},
    loading: 'idle',
  } satisfies HospitalState as HospitalState

  const hospitalSlice = createSlice({
    name: 'hospital',
    initialState,
    reducers: {
    //   setRoleData(state, action) {
    //     state.role = action.payload;
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
      });
      
      builder.addCase(getAllHospital.fulfilled, (state, action) => {
        state.hospital = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getByIdHospital.fulfilled, (state, action) => {
        state.hospitalById = action.payload;
        state.loading = 'succeeded';
      })
    },
  });

  export const {  } = hospitalSlice.actions;
  export const hospitalReducer = hospitalSlice.reducer;