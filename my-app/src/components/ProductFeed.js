import { useState, useEffect } from 'react';
import { fetchProductDB, fetchProductById } from '../controller/fetchProductDB';
import Pagination from './Pagination';
import ProductSearch from './ProductSearch.js';
import ProductCard from './ProductCard'; 
import Masonry from 'react-masonry-css'; 
import { highlightedProductIds } from '../mocked_DB/highlightedProducts';

function ProductFeed({ category = [], availability }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
      const [availabilityState, setAvailabilityState] = useState(availability ?? '');

useEffect(() => {
  async function loadProducts() {
    const data = await fetchProductDB({ category });
    setProducts(data);
  }
  loadProducts();
}, [category]);

const filteredProducts = products.filter(product => {
    const categoryMatch =
      !category || category.length === 0 || category.includes(product.category);

    const availabilityMatch =
      availabilityState === '' ||
      (availabilityState === 'in_stock' && product.availability === 'in_stock') ||
      (availabilityState === 'preorder' && product.availability === 'preorder');

    return categoryMatch && availabilityMatch;
  });


  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
  setCurrentPage(1);
};

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="product-feed">
      <ProductSearch searchTerm={searchTerm} onChange={handleSearchChange} />
      {currentProducts.length > 0 ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            // onAddToCart={onAddToCart}
            highlightedIds={highlightedProductIds} 
        />
          ))}
        </Masonry>
      ) : (
        <p>No products found</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        buttonClassName="custom-button"
      />
    </div>
  );
}

export default ProductFeed;
