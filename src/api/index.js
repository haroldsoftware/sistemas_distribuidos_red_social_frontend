import axios from 'axios';

const api = axios.create({
  baseURL: 'https://red-social-service-389205780371.us-east1.run.app/api',
});

// Adjuntar token JWT en cada request si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
