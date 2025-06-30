import React, { useState, useEffect } from 'react';
import Filters from '../components/Filters';
import ProductFeed from "../components/ProductFeed.js";
import { useCart } from '../context/CartContext';

const API_BASE = process.env.REACT_APP_API_BASE_URL;

function Catalog() {
  const [tempCategory, setTempCategory] = useState([]);
  const [tempAvailability, setTempAvailability] = useState('');
  const [category, setCategory] = useState([]);
  const [availability, setAvailability] = useState('');
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      // Collecting query parameters for filters
      const params = new URLSearchParams();
      if (category.length > 0) params.append('category', category.join(','));
      if (availability) params.append('availability', availability);

      const res = await fetch(`${API_BASE}/products?${params.toString()}`);  
      const data = await res.json();
      setProducts(data.products || []);
    }
    fetchProducts();
  }, [category, availability]);

  return (
    <>
      <main className="catalog-header">
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
                console.log('Categories to filter:', tempCategory);
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
