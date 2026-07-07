import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { env } from '../config';

// Define the shape of our API error response
interface ApiErrorResponse {
  message: string;
  code?: string;
}

export const apiClient = axios.create({
  baseURL: env.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // In a real app, attach token here if not using HttpOnly cookies
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized globally (Token refresh logic placeholder)
    if (error.response?.status === 401 && originalRequest) {
      // Logic to refresh token goes here
      // return apiClient(originalRequest);
    }
    
    return Promise.reject(error);
  }
);
