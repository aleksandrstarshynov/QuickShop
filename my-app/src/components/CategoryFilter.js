import React, { useEffect, useState } from 'react';
import RadioGroup from './RadioButtonGroup';

function CategoryFilter({
  selectedValues = [],      
  setSelectedValues,        
  disabled = false
}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const url = new URL('/api/categories', API_BASE).toString();
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCategories(
          data.map(cat => ({ label: cat.name, value: cat.slug }))
        );
      })
      .catch(() => {
        setCategories([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [API_BASE]);

  if (loading) {
    return <p>Loading categories...</p>;
  }


  const currentValue = selectedValues.length > 0 ? selectedValues[0] : '';

  return (
    <fieldset className="category-filter">
      <legend className="text-lg font-semibold mb-2">Categories</legend>
      <RadioGroup
        options={categories}
        value={currentValue}
        onChange={val => {
                    setSelectedValues([val]);
        }}
        name="category-filter"
        disabled={disabled}
      />

      {/* Кнопка для сброса выбора */}
      {currentValue && (
        <button
          type="button"
          className="custom-button"
          onClick={() => setSelectedValues([])}
          disabled={disabled}
        >
          Reset
        </button>
      )}


    </fieldset>
  );
}

export default CategoryFilter;
