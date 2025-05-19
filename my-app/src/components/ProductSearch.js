function ProductSearch({ searchTerm, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={onChange}
    />
  );
}

export default ProductSearch;
