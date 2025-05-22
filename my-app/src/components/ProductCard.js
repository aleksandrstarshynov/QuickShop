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

    console.log('highlightedIds:', highlightedIds);
  console.log('product.id:', product.id);
  console.log('product.id type:', typeof product.id);

  
  const isTall = highlightedIds.includes(Number(product.id));

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className={`product-card ${isTall ? 'tall-card' : ''}`}>
        <img src={product.images[0]} alt={product.title} />
        <h3>{product.name}</h3>
        <p>id: {product.id} — {isTall ? 'TALL' : 'normal'}</p>
        <p>{product.brand}</p>
        <button className="custom-button" onClick={handleAddToCartClick}>Add to Basket</button>
      </div>
    </Link>
  );
};

export default ProductCard;