import { useState, useEffect } from 'react';
import { fetchProductDB } from '../controller/fetchProductDB.js';
import Pagination from './Pagination';
import ProductSearch from './ProductSearch.js';

function ProductFeed() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  return (
    <div className="product-feed">
      <ProductSearch searchTerm={searchTerm} onChange={handleSearchChange} />
      {currentProducts.length > 0 ? (
        <ul>
          {currentProducts.map((product) => {
            // console.log(product); // <-- логируем
            return (
              <li key={product.id}>
                <img src={product.images[0]} alt={product.title} width={50} />
                {product.name} ({product.brand})
              </li>
            );
          })}
        </ul>
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
