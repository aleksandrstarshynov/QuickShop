import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../controller/fetchProductDB';

const ProductPage = () => {
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
    <div className="product-page">
      <h1>{product.title || product.name}</h1>
      <img
        src={product.thumbnail || product.images[0]}
        alt={product.title || product.name}
        style={{ maxWidth: '400px', borderRadius: '8px' }}
      />

      <p><strong>Бренд:</strong> {product.brand}</p>
      <p><strong>Категория:</strong> {product.category}</p>
      <p><strong>Описание:</strong> {product.description}</p>

      <p>
        <strong>Цена:</strong> <span style={{ textDecoration: 'line-through', color: '#888' }}>{product.price} ₽</span>{' '}
        <span style={{ color: 'red', fontWeight: 'bold' }}>{discountedPrice} ₽</span>{' '}
        <small>({product.discountPercentage}% скидка)</small>
      </p>

      <p><strong>Рейтинг:</strong> {product.rating} ⭐</p>
      <p><strong>На складе:</strong> {product.stock} шт.</p>

      <div className="product-images-gallery" style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
        {product.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${product.title} ${i + 1}`}
            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
            onClick={() => window.open(img, '_blank')}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
