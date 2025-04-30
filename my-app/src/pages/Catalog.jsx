import React from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import ProductSearch from '../components/ProductSearch';

function Catalog() {
  return (
    <>
      <main>
        <h1>Catalog</h1>
      </main>
      <Filters />
      <ProductSearch />
    </>
  );
}

export default Catalog;