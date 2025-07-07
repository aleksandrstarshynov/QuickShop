import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onAddToCart, className = '' }) => {
  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product) {
      console.error('product is undefined!');
      return;
    }

    onAddToCart(product);
  };

  const discountedPrice = Number(product.newPrice).toFixed(2);

  return (
    <div className="product-card-container">
      <Link to={`/product/${product._id}`} className="product-card-link">
        <div className={className}>
          <h3>{product.productName}</h3>
          <img
            src={product.imageURL ?? 'https://via.placeholder.com/150'}
            alt={product.productName}
          />
          <p>{product.productBrand ?? 'No brand'}</p>
          <p className="product-card__price">€{discountedPrice}</p>
          <p>
            <strong>In stock:</strong> {product.inStock ? 'Yes' : 'No'}
          </p>
        </div>
      </Link>

      <button className="custom-button" onClick={handleAddToCartClick}>
        Add to Basket
      </button>
    </div>
  );
};

export default ProductCard;
