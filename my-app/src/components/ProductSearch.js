function ProductSearch({ searchTerm, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={onChange}
      className="catalog-search-input"
    />
  );
}

export default ProductSearch;