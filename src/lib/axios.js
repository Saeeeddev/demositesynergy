import axios from 'axios';

// Create a configured axios instance
export const api = axios.create({
  // Use environment variable for API URL (create .env file later)
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add Interceptors for handling Tokens automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Or get from Zustand store
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling (e.g., redirect to login on 401)
    if (error.response?.status === 401) {
      // Logic to clear auth store and redirect
    }
    return Promise.reject(error);
  }
);