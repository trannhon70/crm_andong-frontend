import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { setInvalidToken } from "../features/usersSlice";
import { store } from "../redux/store";
const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    headers: { 'Content-Type': 'application/json' },
});

// Interceptor cho request
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => { 
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

// Interceptor cho response
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error) => {
        console.log(error);
        
        const dispatch = store.dispatch; 
        // Kiểm tra nếu lỗi là 401 (Unauthorized) và token hết hạn
        if (error.response.data && error.response.data.error === 'Invalid token or user not found' || error.response.data.error === 'Unauthorized') {
            dispatch(setInvalidToken(true));
            return Promise.reject(error); 
        }

        return Promise.reject(error); 
    }
);

export default instance;
