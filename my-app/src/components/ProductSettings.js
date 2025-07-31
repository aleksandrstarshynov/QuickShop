import React, { useState } from 'react';
import { getProductById, getProducts, updateProduct, deleteProduct } from '../services/productService';
import { useAuth } from '../context/authContext';
import Notification from './Notification';

const ProductActions = () => {
  const { user } = useAuth();
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [notification, setNotification] = useState(null);
  const token = localStorage.getItem('token');

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleGetById = async () => {
    try {
      const response = await getProductById(productId);
      setProductData(response.data);
      showNotification('Product fetched', 'success');
    } catch (error) {
      showNotification('Error fetching product', 'error');
    }
  };

  const handleGetAllByAuthor = async () => {
    try {
      const response = await getProducts();
      const filtered = response.data.products.filter(p => p.authorId === String(user.id));
      setUserProducts(filtered);
      showNotification(`Found ${filtered.length} product(s)`, 'info');
    } catch (error) {
      showNotification('Error fetching user products', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = async () => {
    try {
      const response = await updateProduct(productId, productData, token);
      setProductData(response.data);
      showNotification('Product updated', 'success');
    } catch (error) {
      showNotification('Error updating product', 'error');
    }
  };

  const handleDelete = async () => {
    if (!productId) return showNotification('⚠️ Enter product ID', 'info');
    const confirmed = window.confirm(`Delete item with ID: ${productId}?`);
    if (!confirmed) return;

    try {
      await deleteProduct(productId, token);
      setProductData(null);
      setProductId('');
      showNotification(`Product ${productId} deleted`, 'success');
    } catch (error) {
      showNotification('Error deleting product', 'error');
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

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default ProductActions;
