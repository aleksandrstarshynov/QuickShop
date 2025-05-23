import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../controller/fetchProductDB';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();  
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      const data = await fetchProductById(id);
      setProduct(data);
    }
    loadProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

  return (




    <div className="product-details">
<div className="product-header">
  <button onClick={() => navigate(-1)} className="back-button">
    ← Назад
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
    <button onClick={() => console.log("Добавлено в корзину")} className="custom-button">Add to basket</button>
    <button onClick={() => console.log("Добавлено в избранное")} className="custom-button">Add to favorites</button>
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
