import axios from 'axios';

// Helper function to get token from cookies
const getTokenFromCookie = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; token=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const apiClient = axios.create({
  baseURL: 'https://localhost:7173/api',
  withCredentials: true
});

apiClient.interceptors.request.use((config) => {
  const token = getTokenFromCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
