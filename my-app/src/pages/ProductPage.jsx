import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../controller/fetchProductDB';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/authContext';

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();  
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  // const { userId } = useUser(); 
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

  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

  const handleAddToCart = async () => {
    if (!user) {
      alert('Вы должны войти в аккаунт, чтобы добавить товар в корзину');
      return;
    }

    const userId = user.id;
    if (!userId) {
      alert('Ошибка: не удалось определить ID пользователя');
      return;
    }

    try {
      console.log('user.id:', user?.id);
      console.log('product._id:', product?._id);
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId: product._id, // MongoDB ID
          quantity: 1,
        }),
      });

      const data = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', data);
      if (response.ok) {
        alert('Product added to cart!');
      } else {
        alert(`Error: ${data.message}`);
      }
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
        <h1 className="product-title">{product.title || product.name}</h1>
      </div>

      <div className="product-content">
        <div className="product-image">
          <img
            src={product.thumbnail || product.images[0]}
            alt={product.title || product.name}
          />
        </div>

        <div className="product-info">
          <p className="brand-name">Brand: {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p className="description">Description: {product.description}</p>

          <p>
            <strong>Price:</strong>{' '}
            <span className="old-price">€{product.price}</span>{' '}
            <span className="new-price">€{discountedPrice}</span>{' '}
            <small>({product.discountPercentage}% discount)</small>
          </p>

          <p><strong>Rating:</strong> {product.rating} ⭐</p>
          <p><strong>In stock:</strong> {product.stock} pieces</p>

          <div className="product-buttons">
            <button onClick={handleAddToCart}>
              Добавить в корзину
            </button>
            {/* <button onClick={() => console.log("Добавлено в избранное")} className="custom-button">Add to favorites</button> */}
          </div>

          <div className="product-images-gallery">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.title} ${i + 1}`}
                onClick={() => window.open(img, '_blank')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
