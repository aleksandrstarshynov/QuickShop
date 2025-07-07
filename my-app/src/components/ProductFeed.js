import { useState } from 'react';
import Pagination from './Pagination';

import ProductSearch from './ProductSearch';
import ProductCard from './ProductCard';
import Masonry from 'react-masonry-css';
import { highlightedProductIds } from '../mocked_DB/highlightedProducts';
import { useCart } from '../context/CartContext';


function ProductFeed({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();


  const itemsPerPage = 10;

  const filteredBySearch = products.filter(product =>
    product.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBySearch.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredBySearch.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const breakpointColumnsObj = {
    default: 4,
    1000: 3,
    800: 2,
    500: 1,
  };

  return (
    <div className="product-feed">
      <div className="search-bar mb-4">
        <ProductSearch searchTerm={searchTerm} onChange={handleSearchChange} />
      </div>


      {currentProducts.length > 0 ? (

<Masonry
  breakpointCols={breakpointColumnsObj}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column"
>
  {currentProducts.map(product => {
    // Теперь верно обрабатываем число 1
    const isTall = product.highlighted == 1;

    return (
      <ProductCard
        key={product._id}
        product={product}
        onAddToCart={addToCart}
        className={`product-card${isTall ? ' tall-card' : ''}`}
      />
    );
  })}
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
