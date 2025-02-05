import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosError } from "axios";
import { setInvalidToken } from "../features/usersSlice";
import { store } from "../redux/store";

interface ErrorResponse {
    error?: string; // Thuộc tính `error` có thể có hoặc không
}

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    headers: { 'Content-Type': 'application/json' },
    timeout:30000
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
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
);

// Interceptor cho response
instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<ErrorResponse>) => { // Cung cấp kiểu dữ liệu cho error response
        console.error("Response Error:", error);
        
        const dispatch = store.dispatch;

        // Kiểm tra nếu error có response
        if (!error.response) {
            console.error("Lỗi mạng hoặc server không phản hồi!");
            return Promise.reject(error);
        }

        // Lấy error message một cách an toàn
        const errorMessage = error.response.data?.error || "";

        // Kiểm tra lỗi 401 - Unauthorized
        if (error.response.status === 401 && 
            (errorMessage === "Invalid token or user not found" || errorMessage === "Unauthorized")) {
            dispatch(setInvalidToken(true));
        }

        return Promise.reject(error);
    }
);

export default instance;
