import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Добавить новый продукт
export const addProduct = (productData, token) =>
  API.post('/products', productData, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Получить все продукты
export const getProducts = () => API.get('/products');

// Получить один продукт по ID
export const getProductById = (id) => API.get(`/products/${id}`);

// Обновить продукт по ID
export const updateProduct = (id, productData, token) =>
  API.put(`/products/${id}`, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Удалить продукт по ID
export const deleteProduct = (id, token) =>
  API.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
