import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../controller/fetchCategories';

function CategoryFilter({ selectedValues = [], setSelectedValues }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => {
        setCategories([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка категорий...</p>;

  console.log("Категории:", categories);
  console.log("selectedValues:", selectedValues);

  return (
    <div className="category-filter">
      <h3>Categories</h3>
      {categories.map(category => (
        <label key={category.slug} style={{ display: 'block', marginBottom: '0.5rem' }}>
          <input
            type="checkbox"
            value={category.slug}
            checked={selectedValues.includes(category.slug)}
            onChange={e => {
              if (e.target.checked) {
                setSelectedValues([...selectedValues, category.slug]);
              } else {
                setSelectedValues(selectedValues.filter(c => c !== category.slug));
              }
            }}
          />
          {category.name}
        </label>
      ))}
    </div>
  );
}
export default CategoryFilter;