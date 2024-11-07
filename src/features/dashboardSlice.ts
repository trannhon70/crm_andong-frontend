import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { patiantAPI } from "../apis/patient.api";

export const getThongKeDangKy = createAsyncThunk(
    'dashboard/getThongKeDangKy',
    async ( hospitalId: number ,thunkAPI ) => {
      const response = await patiantAPI.getThongKeDangKy(hospitalId)
      return response.data.data
    },
  )

  export const getDanhSachXepHangThamKham = createAsyncThunk(
    'dashboard/getDanhSachXepHangThamKham',
    async ( hospitalId: number ,thunkAPI ) => {
      const response = await patiantAPI.getDanhSachXepHangThamKham(hospitalId)
      return response.data.data
    },
  )

  export const getThongKeQuaKenh = createAsyncThunk(
    'dashboard/getThongKeQuaKenh',
    async ( hospitalId: number ,thunkAPI ) => {
      const response = await patiantAPI.getThongKeQuaKenh(hospitalId)
      return response.data.data
    },
  )

interface DashboardState {
    ThongKeDangKy: any,
    DanhSachXepHang: any,
    ThongKeQuaKenh: any,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    
  }

  const initialState = {
    ThongKeDangKy: {},
    DanhSachXepHang: {},
    ThongKeQuaKenh: [],
    loading: 'idle',
  
  } satisfies DashboardState as DashboardState


  const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
      setThongKeDangKy(state, action) {
        state.ThongKeDangKy = action.payload;
      },
      setDanhSachXepHangThamKham(state, action) {
        state.DanhSachXepHang = action.payload;
      },
      setThongKeQuaKenh(state, action) {
        state.ThongKeQuaKenh = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(getThongKeDangKy.fulfilled, (state, action) => {
        state.ThongKeDangKy = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getDanhSachXepHangThamKham.fulfilled, (state, action) => {
        state.DanhSachXepHang = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getThongKeQuaKenh.fulfilled, (state, action) => {
        state.ThongKeQuaKenh = action.payload;
        state.loading = 'succeeded';
      })
    },
  });

  export const { setThongKeDangKy, setDanhSachXepHangThamKham, setThongKeQuaKenh } = dashboardSlice.actions;
  export const dashboardReducer = dashboardSlice.reducer;