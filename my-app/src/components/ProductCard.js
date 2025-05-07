// ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.title} />
      <h3>{product.name}</h3>
      <p>{product.brand}</p>
    </div>
  );
};

export default ProductCard;
