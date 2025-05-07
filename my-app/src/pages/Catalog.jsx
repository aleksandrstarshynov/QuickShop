import React from 'react';
import Filters from '../components/Filters';
import ProductFeed from '../components/ProductFeed';


function Catalog() {
  return (
    <>
      <main>
        <h1>Catalog</h1>
      </main>
      <Filters />
      <ProductFeed />
    </>
  );
}

export default Catalog;