import axios from 'axios';

// Create a configured axios instance
export const api = axios.create({
  // Since we use the '/api' prefix in calls, ensure the server (json-server) 
  // supports it, or we rely on a routes.json rewrite.
  baseURL: 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: Log errors globally or redirect on 401
    return Promise.reject(error);
  }
);