import axios from 'axios';
import { authApi } from '@/api/authApi';
import { removeUserData } from '@/services/authServices';

export const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
  withCredentials: true,
  validateStatus: status => {
    return ![405, 408, 429].includes(status) && status < 500;
  },
});

httpClient.interceptors.response.use(
  response => {
    if (response.status >= 400) {
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

httpClient.interceptors.response.use(response => {
  if (response.error?.statusCode === 401) {
    removeUserData();
    authApi.logout().then(() => {
      location.reload();
    });
  }
  return response;
});
