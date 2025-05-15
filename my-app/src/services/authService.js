import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (credentials) => API.post('/auth/login', credentials);

export const getProfile = (token) =>
  API.get('/auth/profile', { headers: { Authorization: `Bearer ${token}` } });

export const logoutUser = () => API.post('/auth/logout');

export const updateUserData = (userData, token) =>
  API.put('/auth/update', userData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteUser = (token) =>
    API.delete('/auth/delete', {
      headers: { Authorization: `Bearer ${token}` },
});