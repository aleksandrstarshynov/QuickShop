import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,

});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (userData) => API.post('/auth/register', userData);

export const loginUser = (credentials) => API.post('/auth/login', credentials);

export const fetchUserProfile = () => API.get('/auth/profile');

export const logoutUser = () => API.post('/auth/logout');

export const updateUserData = (userData) => API.put('/auth/update', userData);

export const deleteUser = () => API.delete('/auth/delete');
