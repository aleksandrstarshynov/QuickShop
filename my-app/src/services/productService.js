import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Request interceptor to automatically attach token
API.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a new product
export const addProduct = (productData) => {
  return API.post('/products', productData);
};

// all products
export const getProducts = () => {
  return API.get('/products');
};

// single product by ID
export const getProductById = (id) => {
  return API.get(`/products/${id}`);
};

// Update a product by ID
export const updateProduct = (id, productData) => {
  return API.put(`/products/${id}`, productData);
};

// Delete a product by ID
export const deleteProduct = (id) => {
  return API.delete(`/products/${id}`);
};
