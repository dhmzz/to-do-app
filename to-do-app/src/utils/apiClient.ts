// src/utils/axios.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import router from '../router'; // Sesuaikan path ini sesuai dengan struktur proyek Anda
import { ElMessage } from 'element-plus';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://94.74.86.174:8080/api', 
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
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

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      ElMessage({
        message: "Session Expired", 
        type:"info"
      })
      router.push('/');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
