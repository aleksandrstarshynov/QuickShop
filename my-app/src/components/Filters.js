
import React from 'react';
import CategoryFilter from './CategoryFilter';


function Filters({
  selectedCategories,
  onCategoryChange,
  selectedAvailability,
  onAvailabilityChange
}) {
  return (
    <div className="filters">
      <h2>Filters</h2>
      <CategoryFilter
        selectedValues={selectedCategories}
        setSelectedValues={onCategoryChange}
      />
    </div>
  );
}

export default Filters;
