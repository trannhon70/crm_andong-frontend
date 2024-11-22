
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { patiantAPI } from '../apis/patient.api'

export const getBaoCaoTongHop = createAsyncThunk(
    'report/getBaoCaoTongHop',
    async ( query: any ,thunkAPI ) => {
      const response = await patiantAPI.getBaoCaoTongHop(query)
      return response.data.data
    },
  )

  export const getThongkeGioitinh = createAsyncThunk(
    'report/getThongkeGioitinh',
    async ( body: any ,thunkAPI ) => {
      const response = await patiantAPI.getThongkeGioitinh(body)
      return response.data.data
    },
  )

  export const getThongkeTuoi = createAsyncThunk(
    'report/getThongkeTuoi',
    async ( body: any ,thunkAPI ) => {
      const response = await patiantAPI.getThongkeTuoi(body)
      return response.data.data
    },
  )

interface dataReportState {
    resultYear:any,
    resultMonth: any,
    gender: any,
    tuoi: any,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  }

  const initialState = {
    resultYear: [],
    resultMonth: [],
    gender: [],
    tuoi: [],
    loading: 'idle',
  } satisfies dataReportState as dataReportState

  const dataReportSlice = createSlice({
    name: 'dataReport',
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder.addCase(getBaoCaoTongHop.fulfilled, (state, action) => {
        state.resultYear = action.payload.resultYear;
        state.resultMonth = action.payload.resultMonth;
        state.loading = 'succeeded';
      });

      builder.addCase(getThongkeGioitinh.fulfilled, (state, action) => {
        state.gender = action.payload;
        state.loading = 'succeeded';
      });

      builder.addCase(getThongkeTuoi.fulfilled, (state, action) => {
        state.tuoi = action.payload;
        state.loading = 'succeeded';
      });
      
    },
  });
  export const {  } = dataReportSlice.actions;
  export const dataReportReducer = dataReportSlice.reducer;