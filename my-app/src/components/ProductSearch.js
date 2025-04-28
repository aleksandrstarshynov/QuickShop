import { useState } from 'react';
import products from '../mocked_DB/products.json'; 

function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
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