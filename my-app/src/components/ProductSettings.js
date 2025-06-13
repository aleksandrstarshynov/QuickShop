// src/components/ProductActions.js
import React, { useState } from 'react';
import { getProductById, updateProduct, deleteProduct } from '../services/productService';

const ProductActions = () => {
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState(null);
  const [message, setMessage] = useState('');

  const handleGet = async () => {
    try {
      const response = await getProductById(productId);
      setProductData(response.data);
      setMessage('Product fetched successfully');
    } catch (error) {
      setMessage('Error fetching product');
    }
  };

  const handleEdit = async () => {
    if (!productData) return setMessage('No product to update');
    try {
      const updated = {
        ...productData,
        productName: productData.productName + ' (edited)', // пример
      };
      const response = await updateProduct(productId, updated);
      setProductData(response.data);
      setMessage('Product updated successfully');
    } catch (error) {
      setMessage('Error updating product');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
      setProductData(null);
      setMessage('Product deleted');
    } catch (error) {
      setMessage('Error deleting product');
    }
  };

  return (
    <div className="product-actions">
      <h3>Product Actions</h3>
      <input
        type="text"
        placeholder="Enter product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleGet}>Получить продукт</button>
        <button onClick={handleEdit}>Редактировать продукт</button>
        <button onClick={handleDelete}>Удалить продукт</button>
      </div>
      {message && <p>{message}</p>}
      {productData && (
        <pre style={{ backgroundColor: '#eee', padding: '10px' }}>
          {JSON.stringify(productData, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ProductActions;
