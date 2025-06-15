import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { apiUrl } from '../config/environment';
import loginStore from '../store/loginStore';

// Create axios instance
const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

// Request interceptor to add access token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = loginStore.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (
      error.response?.status === 401 &&
      error.response?.data &&
      typeof error.response.data === 'object' &&
      'code' in error.response.data &&
      error.response.data.code === 'TOKEN_EXPIRED' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = loginStore.getRefreshToken();
        
        if (!refreshToken) {
          // No refresh token, redirect to login
          loginStore.clearAuthData();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Attempt to refresh the token
        const refreshSuccess = await loginStore.refreshToken();

        if (refreshSuccess) {
          // Retry the original request with new token
          const newAccessToken = loginStore.getAccessToken();
          if (newAccessToken && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return api(originalRequest);
        } else {
          // Refresh failed, redirect to login
          loginStore.clearAuthData();
          window.location.href = '/login';
          return Promise.reject(error);
        }

      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        loginStore.clearAuthData();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
