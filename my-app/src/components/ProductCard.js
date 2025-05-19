import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCartClick = (e) => {
    e.preventDefault();  
    e.stopPropagation(); 
    onAddToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        <img src={product.images[0]} alt={product.title} />
        <h3>{product.name}</h3>
        <p>{product.brand}</p>

        <button className="custom-button" onClick={handleAddToCartClick}>В корзину</button>
      </div>
    </Link>
  );
};

export default ProductCard;