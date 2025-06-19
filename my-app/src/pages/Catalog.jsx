import React, { useState, useEffect } from 'react';
import Filters from '../components/Filters';
import ProductFeed from "../components/ProductFeed.js";
import { useCart } from '../context/CartContext';

function Catalog() {
  const [tempCategory, setTempCategory] = useState([]);
  const [tempAvailability, setTempAvailability] = useState('');
  const [category, setCategory] = useState([]);
  const [availability, setAvailability] = useState('');
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      // Собираем query параметры для фильтров
      const params = new URLSearchParams();
      if (category.length > 0) params.append('category', category.join(','));
      if (availability) params.append('availability', availability);

      const res = await fetch(`http://localhost:4000/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products || []);
    }
    fetchProducts();
  }, [category, availability]);

  return (
    <>
      <main className="catalog-header">
        {/* Заголовок каталога */}
      </main>
      <div className="catalog-container">
        <div className="filter-side-block">
          <Filters
            tempCategory={tempCategory}
            setTempCategory={setTempCategory}
            tempAvailability={tempAvailability}
            setTempAvailability={setTempAvailability}
          />
            <button
              className="custom-button" style={{ marginTop: '30px' }} onClick={() => {
                console.log('Категории для фильтрации:', tempCategory);
                setCategory(tempCategory);
                setAvailability(tempAvailability);
              }}
            >
              Apply
            </button>
        </div>
        <ProductFeed products={products} onAddToCart={addToCart} />
      </div>
    </>
  );
}

export default Catalog;
