import axios from 'axios';
import { authApi } from '@/api/authApi';

export const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 1000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.response.use(
  response => {
    if (response.status === 401) {
      authApi.logout();
    } else if (response.status === 400 || response.status > 401) {
      return {
        success: false,
        result: null,
        error: {
          statusCode: response.status,
          message: response.data.message ?? response.data ?? response.statusText,
        },
      };
    } else {
      return {
        success: true,
        result: response.data,
        error: null,
      };
    }
  },
  error => {
    if (!error.response || error.code === 'ECONNABORTED') {
      return Promise.reject(new Error(error.request));
    } else {
      return Promise.reject(error);
    }
  }
);
