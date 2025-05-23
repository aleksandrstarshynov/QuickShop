import Filters from '../components/Filters';
import ProductFeed from '../components/ProductFeed';
import React, { useState } from 'react';



function Catalog() {
const [tempCategory, setTempCategory] = useState([]);
const [category, setCategory] = useState([]);

return (
    <>
      <main className="catalog-header">
        {/* <h1>Catalog</h1> */}
      </main>
      <div className="catalog-container">
        <div className="filter-side-block">
        <Filters
          tempCategory={tempCategory}
          setTempCategory={setTempCategory}
        />
        {/* Кнопка Применить фильтры */}
        <button onClick={() => setCategory(tempCategory)}>Apply</button>
        </div>
        <ProductFeed category={category} />
      </div>
    </>
  );
}

export default Catalog;