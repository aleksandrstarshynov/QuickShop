import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Add new product
export const addProduct = (productData, token) => {
  console.log("BASE_URL:", process.env.REACT_APP_API_BASE_URL);
  return API.post('/products', productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get all products
export const getProducts = () => API.get('/products');

// Get one product by ID
export const getProductById = (id) => API.get(`/products/${id}`);

// Update product by ID
export const updateProduct = (id, productData, token) =>
  API.put(`/products/${id}`, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Delete product by ID
export const deleteProduct = (id, token) =>
  API.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });