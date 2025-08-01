import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../controller/fetchProductDB';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/authContext';
import ProductComments from '../components/ProductComments';

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();  
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();
  console.log('user:', user);

  useEffect(() => {
    async function loadProduct() {
      const data = await fetchProductById(id);
      setProduct(data);
    }
    loadProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = async () => {
    if (!user) {
      alert('You must be logged in to add this item to your cart.');
      return;
    }

    const userId = user.id;
    if (!userId) {
      alert('Error: Unable to determine user ID');
      return;
    }

    try {
      console.log('user.id:', user?.id);
      console.log('product._id:', product?._id);

      await addToCart(product);
      console.log('Product added to cart!');
    } catch (error) {
      console.error('Add to cart failed:', error);
      alert('Failed to add product to cart');
    }
  };

  return (
    <div className="product-details">
      <div className="product-header">
        <button onClick={() => navigate(-1)} className="back-button">
          Back
        </button>
        <h1 className="product-title">{product.productName || product.name}</h1>
      </div>

      <div className="product-content">
        <div className="product-image">
          <img
            src={product.thumbnail || product.imageURL}
            alt={product.productName || product.name}
          />
        </div>

        <div className="product-info">
          <p className="brand-name">Brand: {product.productBrand}</p>
          <p><strong>Category:</strong> {product.productCategory}</p>
          <p className="description">Description: {product.productDescription}</p>

          <p>
            <strong>Price:</strong>{' '}
            <span className="old-price">{product.oldPrice}</span>{' '}
            <span className="new-price">{product.newPrice}</span>{' '}
          </p>

          <p><strong>Rating:</strong> {product.productRating} ⭐</p>
          <p><strong>In stock:</strong> {product.inStock ? 'Yes, available' : 'Out of stock'}</p>

          <div className="product-buttons">
            <button className="custom-button" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>

          {Array.isArray(product.images) && product.images.length > 0 && (
            <div className="product-images-gallery">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.productName} ${i + 1}`}
                  onClick={() => window.open(img, '_blank')}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <ProductComments
      productId={product._id}
      username={user?.username || 'Гость'}
      />
    </div>
  );
};

export default ProductPage;
