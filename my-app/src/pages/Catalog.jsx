import React, { useState } from 'react';
import Filters from '../components/Filters';
import ProductFeed from "../components/ProductFeed.js" 
import { useCart } from '../context/CartContext';


function Catalog() {
  const [tempCategory, setTempCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [availability, setAvailability] = useState(''); 
  const [tempAvailability, setTempAvailability] = useState('');
  const { addToCart } = useCart();


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
<button className="custom-button" style={{ marginTop: '30px' }} onClick={() => {
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
