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

interface DashboardState {
    ThongKeDangKy: any,
    DanhSachXepHang: any,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    
  }

  const initialState = {
    ThongKeDangKy: {},
    DanhSachXepHang: {},
    loading: 'idle',
  
  } satisfies DashboardState as DashboardState


  const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
    //   setRoleData(state, action) {
    //     state.role = action.payload;
    //   },
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
    },
  });

  export const {  } = dashboardSlice.actions;
  export const dashboardReducer = dashboardSlice.reducer;