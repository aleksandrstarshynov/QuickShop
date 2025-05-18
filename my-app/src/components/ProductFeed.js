import { useState, useEffect } from 'react';
import { fetchProductDB } from '../controller/fetchProductDB.js';
import Pagination from './Pagination';
import ProductSearch from './ProductSearch.js';
import ProductCard from './ProductCard'; 
import Masonry from 'react-masonry-css'; 

function ProductFeed() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProductDB();
      setProducts(data);
    }
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <ProductCard key={product.id} product={product} /> // Используем универсальную карточку
          ))}
        </Masonry>
      ) : (
        <p>No products found</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductFeed;
