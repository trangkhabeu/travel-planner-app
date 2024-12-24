import axios from 'axios';
import { getToken } from './authToken';

const api = axios.create({
    baseURL:'http://10.0.2.2:8000/api',
    timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();  // Lấy token từ AsyncStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});


export default api;

const registerUser = async (data) => {
  try {
    const response = await api.post('/app/register', data);
    console.log(response.data);
  } catch (error) {
    console.error('API error:', error);
  }
};
