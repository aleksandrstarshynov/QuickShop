import React, { useEffect, useState } from 'react';
import { fetchProductDB } from '../controller/fetchProductDB.js'; 

const ProductList = () => {
  const [laptops, setLaptops] = useState([]);
  const [page, setPage] = useState(0);
  const limit = 20;

  useEffect(() => {
    fetchProductDB({ category: "", limit, skip: page * limit })
      .then(setLaptops);
  }, [page, limit]);

  const handleNext = () => setPage(prev => prev + 1);
  const handlePrev = () => setPage(prev => Math.max(prev - 1, 0));
  // console.log(laptops);
  return (
    <div>
      <h2>Список ноутбуков</h2>

      <ul>
        {laptops.map(laptop => (
          <li key={laptop.id}>
            <strong>{laptop.title}</strong> — {laptop.price}$          
            { <img src={laptop.images} className="Product-image" /> }
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handlePrev} disabled={page === 0}>Назад</button>
        <span style={{ margin: '0 1rem' }}>Страница: {page + 1}</span>
        <button onClick={handleNext} disabled={laptops.length < limit}>Вперёд</button>
      </div>
    </div>
  );
};

export default ProductList;
