import React, { useState } from 'react';
import Filters from '../components/Filters';
import ProductFeed from "../components/ProductFeed.js" 


function Catalog() {
  const [tempCategory, setTempCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [availability, setAvailability] = useState(''); 
  const [tempAvailability, setTempAvailability] = useState('');


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
<button onClick={() => {
  setCategory(tempCategory);
  setAvailability(tempAvailability);
}}>
  Apply
</button>
        </div>
        <ProductFeed category={category} availability={availability} />
      </div>
    </>
  );
}

export default Catalog;
