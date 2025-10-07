import axios from 'axios';
import config from '../config';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://assignly2.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

fetch(`${API_URL}/api/your-endpoint`)
  .then(response => response.json())
  .then(data => console.log(data));
// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    if (error.response) {
      // Server responded with error status
      console.error('Error details:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Error message:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;