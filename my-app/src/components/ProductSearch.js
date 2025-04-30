import { useState, useEffect } from 'react';
import { fetchProductDB } from '../controller/fetchProductDB.js'; 

function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  // console.log(products);
  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProductDB();
      setProducts(data);
    }

    loadProducts();
  }, []);

 

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) 
  // ||
  //   product.price.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search products..." 
        value={searchTerm} 
        onChange={handleChange} 
      />
      
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id}>
              {product.name} ({product.brand})
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found</p>  
      )}
    </div>
  );
}

export default ProductSearch;
