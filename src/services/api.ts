import axios from 'axios';
import { logout } from './authHelper';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Token expirado, deslogando...');
      logout();
      setTimeout(() => (window.location.href = '/login'), 500);
    }
    return Promise.reject(error);
  }
);

export default api;
