import axios from 'axios';
import { logout } from './authHelper';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
});

// Intercepta requisições para adicionar o token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepta respostas para lidar com erro 401 (token expirado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Token expirado, deslogando...');
      logout(); // Chama a função de logout globalmente
      window.location.href = '/login'; // Redireciona para a tela de login
    }
    return Promise.reject(error);
  }
);

export default api;
