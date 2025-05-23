import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import { highlightedProductIds } from '../mocked_DB/highlightedProducts';

const ProductCard = ({ product, onAddToCart, highlightedIds = [] }) => {
  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  // console.log('highlightedIds:', highlightedIds);
  // console.log('product.id:', product.id);
  // console.log('product.id type:', typeof product.id);
  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
  
  const isTall = highlightedIds.includes(Number(product.id));

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className={`product-card ${isTall ? 'tall-card' : ''}`}
            >
        <h3>{product.name}</h3>
        <img src={product.images[0]} alt={product.title} />
        {/* <p>id: {product.id} — {isTall ? 'TALL' : 'normal'}</p> */}
        <p>{product.brand}</p>
        <p style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}>
          €{discountedPrice}
        </p>
        <button className="custom-button" onClick={handleAddToCartClick}>Add to Basket</button>
        <p><strong>In stock:</strong> {product.stock} pieces</p>
      </div>
    </Link>
  );
};

export default ProductCard;