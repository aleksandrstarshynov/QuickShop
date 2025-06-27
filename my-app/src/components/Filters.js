// import CategoriesFilter from "./CategoriesFilter.js";
// import LanguageFilter from "./LanguageFilter.js";
 import FileFormatFilter from "./FileFormatFilter.js";
// import DeliveryFilter from "./DeliveryFilter.js";
import CategoryFilter from './CategoryFilter.js';
// import AvailabilityFilter from './AvailabilityFilter';
import React, { useState } from 'react';


function Filters({
  tempCategory,
  setTempCategory,
  tempAvailability,
  setTempAvailability
}) {  
const [availability, setAvailability] = useState('');

  const handleCheckboxChange = (slug) => {
    if (tempCategory.includes(slug)) {
      setTempCategory(tempCategory.filter(c => c !== slug));
    } else {
      setTempCategory([...tempCategory, slug]);
    }
  };

  
  return (
    <div className="filters">
    <>
        <h2 style={{ marginBottom: '20px' }}>Filters</h2>
        {/* <CategoriesFilter /> */}
        {/* <LanguageFilter />
        <FileFormatFilter /> */}
        {/* <DeliveryFilter /> */}
        <CategoryFilter
        selectedValues={tempCategory}
        setSelectedValues={setTempCategory}
        />
  {/* <AvailabilityFilter
    availability={tempAvailability}
    setAvailability={setTempAvailability}
  /> */}
    </>
    </div>
  );
}

export default Filters;