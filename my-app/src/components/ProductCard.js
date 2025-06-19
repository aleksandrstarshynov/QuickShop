import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const ProductCard = ({ product, onAddToCart, highlightedIds = [] }) => {
  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
console.log("product in addToCart click:", product);

    if (!product) {
      console.error('product is undefined!');
      return;
    }
    console.log('Добавляем в корзину product:', product);
    onAddToCart(product);
  };

  // В базе discountPercentage отсутствует, считаем его 0
  const discountPercentage = 0;

  // Цена со скидкой — просто newPrice, тк скидки нет
  // Если в будущем появится скидка, можно раскомментировать следующую строку
  // const discountedPrice = (product.newPrice * (1 - discountPercentage / 100)).toFixed(2);
  const discountedPrice = Number(product.newPrice).toFixed(2);

  // Сравниваем highlightedIds с числовым _id продукта — приводим _id к числу для проверки
  // Если у тебя _id — строка нечисловая, переделай highlightedIds под строки
  const isTall = highlightedIds.includes(Number(product._id));

  return (
    <>
      <Link to={`/product/${product._id}`} className="product-card-link">
        <div className={`product-card ${isTall ? 'tall-card' : ''}`}>
          <h3>{product.productName}</h3>
          <img src={product.imageURL ?? 'https://via.placeholder.com/150'} alt={product.productName} />
          <p>{product.productBrand ?? 'No brand'}</p>
          <p style={{ color: 'red', fontSize: '20px', fontWeight: 'bold' }}>
            €{discountedPrice}
          </p>
          <p><strong>In stock:</strong> {product.inStock ? 'Yes' : 'No'}</p>
        </div>
      </Link>
      <button className="custom-button" onClick={handleAddToCartClick}>
        Add to Basket
      </button>
    </>
  );
};

export default ProductCard;
