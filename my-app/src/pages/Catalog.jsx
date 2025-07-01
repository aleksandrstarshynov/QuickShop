import React, { useState, useEffect } from 'react';
import Filters from '../components/Filters';
import ProductFeed from "../components/ProductFeed";

function Catalog() {
  const [category, setCategory] = useState([]);
  const [availability, setAvailability] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const params = new URLSearchParams();
      
      // 👇 отправляем каждую категорию отдельно
      if (category.length > 0) {
        category.forEach(slug => params.append('categories', slug));
      }

      if (availability) {
        params.append('availability', availability);
      }

      console.log("🔍 URL:", `http://localhost:4000/products?${params.toString()}`); //TODO
      const res = await fetch(`http://localhost:4000/products?${params.toString()}`);//TODO
      const data = await res.json();
      setProducts(data.products || []);
    }

    fetchProducts();
  }, [category, availability]);

  return (
    <div className="catalog-container">
      <div className="filter-side-block">
        <Filters
          selectedCategories={category}
          onCategoryChange={setCategory}
          selectedAvailability={availability}
          onAvailabilityChange={setAvailability}
        />
      </div>
      <div className="product-feed-container">
      <ProductFeed products={products} />
    </div>
    </div>
  );
}

export default Catalog;
