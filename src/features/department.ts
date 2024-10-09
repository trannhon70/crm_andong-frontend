import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { departmentAPI } from "../apis/department.api"


export const getAllByIdHospital = createAsyncThunk(
    'department/getAllByIdHospital',
    async ( id: number ,thunkAPI ) => {
      const response = await departmentAPI.getAllByIdHospital(id)
      return response.data.data
    },
  )

  interface DepartmentState {
    dataAll:any,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  }

  const initialState = {
    dataAll: [],
    loading: 'idle',
  } satisfies DepartmentState as DepartmentState


  const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
    //   setRoleData(state, action) {
    //     state.role = action.payload;
    //   },
    },
    extraReducers: (builder) => {
     
      
      builder.addCase(getAllByIdHospital.fulfilled, (state, action) => {
        state.dataAll = action.payload;
        state.loading = 'succeeded';
      })
    },
  });

    // export const {  } = hospitalSlice.actions;
    export const departmentReducer = departmentSlice.reducer;