import axios, {  AxiosResponse, InternalAxiosRequestConfig } from "axios";

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
        return Promise.reject(error);
    }
);

// Interceptor cho response
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
