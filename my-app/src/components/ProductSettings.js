import React, { useState, useEffect } from 'react';
import { getProductById, getProducts, updateProduct, deleteProduct } from '../services/productService';
import { useAuth } from '../context/authContext';

const ProductActions = () => {
  const { user } = useAuth(); // get the current user
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  // Get product by ID
  const handleGetById = async () => {
    try {
      const response = await getProductById(productId);
      setProductData(response.data);
      setMessage('✅ Product fetched');
    } catch (error) {
      setMessage('❌ Error fetching product');
    }
  };

  // Get all products from the author
  const handleGetAllByAuthor = async () => {
    try {
      const response = await getProducts(); 
      const filtered = response.data.products.filter(p => p.authorId === String(user.id));
      setUserProducts(filtered);
      setMessage(`🔍 Найдено товаров: ${filtered.length}`);
    } catch (error) {
      setMessage('❌ Error fetching user products');
    }
  };

  // Edit fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  // Update product
  const handleEdit = async () => {
    try {
      const response = await updateProduct(productId, productData, token);
      setProductData(response.data);
      setMessage(' Product updated');
    } catch (error) {
      setMessage('❌ Error updating product');
    }
  };

  // Remove product
  const handleDelete = async () => {
    if (!productId) return setMessage('Enter product ID');
    const confirmed = window.confirm(`Delete item with ID: ${productId}?`);
    if (!confirmed) return;

    try {
      await deleteProduct(productId, token);
      setProductData(null);
      setMessage(` Product ${productId} deleted`);
      setProductId('');
    } catch (error) {
      console.error(error);
      setMessage('❌ Error deleting product');
    }
  };

  return (
    <div className="product-actions">
      <h3>🔧 Product Actions</h3>

      <input
        type="text"
        placeholder="Enter product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />

      <div style={{ marginTop: '10px' }}>
        <button onClick={handleGetById}>Get the product</button>
        <button onClick={handleGetAllByAuthor}>All products by the author</button>
        <button onClick={handleEdit}>Save changes</button>
        <button onClick={handleDelete}>Remove product</button>
      </div>

      {message && <p style={{ marginTop: '10px' }}>{message}</p>}

      {/* Editable product */}
      {productData && (
        <div style={{ marginTop: '20px' }}>
          <h4>Edit product</h4>
          <input name="productName" value={productData.productName || ''} onChange={handleChange} placeholder="Product Name" />
          <input name="productBrand" value={productData.productBrand || ''} onChange={handleChange} placeholder="Brand" />
          <input name="productCategory" value={productData.productCategory || ''} onChange={handleChange} placeholder="Category" />
          <textarea name="productDescription" value={productData.productDescription || ''} onChange={handleChange} placeholder="Description" />
          <input name="oldPrice" value={productData.oldPrice || ''} onChange={handleChange} placeholder="Old Price" />
          <input name="newPrice" value={productData.newPrice || ''} onChange={handleChange} placeholder="New Price" />
          <input name="productRating" value={productData.productRating || ''} onChange={handleChange} placeholder="Rating" />
          <input name="availableQuantity" type="number" value={productData.availableQuantity || 0} onChange={handleChange} placeholder="Quantity" />
          <input name="imageURL" value={productData.imageURL || ''} onChange={handleChange} placeholder="Main image" />
          <input name="secondaryImageURL" value={productData.secondaryImageURL || ''} onChange={handleChange} placeholder="Secondary image" />
          <p><strong>Author ID:</strong> {productData.authorId}</p>
          <p><strong>Created:</strong> {new Date(productData.createdAt).toLocaleString()}</p>
        </div>
      )}

      {/* List of all products by the author */}
      {userProducts.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h4>All products by the author</h4>
          <ul>
            {userProducts.map(prod => (
              <li key={prod._id}>
                🛍️ {prod.productName} – €{prod.newPrice} (ID: {prod._id})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductActions;
