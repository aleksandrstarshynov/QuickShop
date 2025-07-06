import React, { useEffect, useState } from 'react';

function CategoryFilter({ selectedValues, setSelectedValues }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.REACT_APP_API_BASE_URL;
  
useEffect(() => {
  const url = new URL('/api/categories', API_BASE).toString();

  fetch(url)
    .then(res => res.json())
    .then(data => {
      setCategories(data);
    })
    .catch(() => {
      setCategories([]);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);


  const toggleCategory = (slug, checked) => {
    if (checked) {
      setSelectedValues(prev => [...prev, slug]);
    } else {
      setSelectedValues(prev => prev.filter(s => s !== slug));
    }
  };

  if (loading) return <p>Loading categories...</p>;


  return (
    <div className="category-filter">
      <h3 className="text-lg font-semibold mb-2">Categories</h3>
      {categories.map(category => (
        <label key={category.slug} className="block mb-2 cursor-pointer">
          <input
            type="checkbox"
            value={category.slug}
            checked={selectedValues.includes(category.slug)}
            onChange={e => toggleCategory(category.slug, e.target.checked)}
            className="mr-2"
          />
          {category.name}
        </label>
      ))}
    </div>
  );
}

export default CategoryFilter;
