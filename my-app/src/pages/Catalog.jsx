import React from 'react';
import Filters from '../components/Filters';
import ProductFeed from '../components/ProductFeed';


function Catalog() {
  return (
    <>
      <main className="catalog-header">
        {/* <h1>Catalog</h1> */}
      </main>
      <div className="catalog-container">
      <Filters />
      <ProductFeed />
      </div>
    </>
  );
}

export default Catalog;