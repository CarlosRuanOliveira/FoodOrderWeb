import axios from 'axios';
import { logout } from './authHelper';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Token expirado, deslogando...');
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
