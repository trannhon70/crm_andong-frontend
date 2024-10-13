import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { cityAPI } from "../apis/city.api"
import { districtAPI } from "../apis/district.api"
import { departmentAPI } from "../apis/department.api"
import { diseaseAPI } from "../apis/disease.api"


export const fetchCity = createAsyncThunk(
    'patient/fetchCity',
    async ( _ ,thunkAPI ) => {
        const response = await cityAPI.getAllCity()
        return response.data.data
      },
  )

  export const fetchDistrictbyIdCity = createAsyncThunk(
    'patient/fetchDistrictbyIdCity',
    async ( id: number ,thunkAPI ) => {
        const response = await districtAPI.getDistrictByIdCity(id)
        return response.data.data
      },
  )

  export const getAllByIdHospital = createAsyncThunk(
    'patient/getAllByIdHospital',
    async ( id: number ,thunkAPI ) => {
        const response = await departmentAPI.getAllByIdHospital(id)
        return response.data.data
      },
  )

  export const getByIdDepartment = createAsyncThunk(
    'patient/getByIdDepartment',
    async (query:any ,thunkAPI ) => {
        const response = await diseaseAPI.getByIdDepartment(query)
        return response.data.data
      },
  )



  interface PatientState {
    data:any,
    pageSize: number,
    pageIndex: number,
    total: number,
    totalPages: number,
    city: any,
    district:any,
    department:any,
    diseasses:any,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  }

  const initialState = {
    data: {},
    pageSize: 5,
    pageIndex: 1,
    total: 0,
    totalPages: 0,
    city: [],
    district:[],
    department:[],
    diseasses: [],
    loading: 'idle',
  } satisfies PatientState as PatientState

  const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
    //   setRoleData(state, action) {
    //     state.role = action.payload;
    //   },
    },
    extraReducers: (builder) => {
    //   builder.addCase(fetchGetPaging.fulfilled, (state, action) => {
    //     state.data = action.payload.data;
    //     state.pageSize = action.payload.pageSize;
    //     state.pageIndex = action.payload.pageIndex;
    //     state.total = action.payload.total;
    //     state.totalPages = action.payload.totalPages;
    //     state.loading = 'succeeded';
    //   });
      
      builder.addCase(fetchCity.fulfilled, (state, action) => {
        state.city = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(fetchDistrictbyIdCity.fulfilled, (state, action) => {
        state.district = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getAllByIdHospital.fulfilled, (state, action) => {
        state.department = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getByIdDepartment.fulfilled, (state, action) => {
        state.diseasses = action.payload;
        state.loading = 'succeeded';
      })
    },
  });

  // export const {  } = patientSlice.actions;
  export const patientReducer = patientSlice.reducer;