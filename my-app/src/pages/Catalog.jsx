import React from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import ProductSearch from '../components/ProductSearch';
import ProductList from '../components/ProductList.js';

function Catalog() {
  return (
    <>
      <main>
        <h1>Catalog</h1>
      </main>
      <Filters />
      <ProductSearch />
      {/* <ProductList/> */}
    </>
  );
}

export default Catalog;