import Cookies from 'js-cookie';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://localhost:7173/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Đảm bảo cookie được gửi kèm với mỗi yêu cầu
});

const getTokenFromCookie = () => {
  return Cookies.get('token');
};
// Thêm interceptor để gắn token vào header
apiClient.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookie();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
