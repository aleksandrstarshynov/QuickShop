// import CategoriesFilter from "./CategoriesFilter.js";
import LanguageFilter from "./LanguageFilter.js";
 import FileFormatFilter from "./FileFormatFilter.js";
// import DeliveryFilter from "./DeliveryFilter.js";
import CategoryFilter from './CategoryFilter.js';


function Filters({ tempCategory, setTempCategory }) {  
  
  return (
    <div className="filters">
    <>
        <h2>Filters</h2>
        {/* <CategoriesFilter /> */}
        {/* <LanguageFilter />
        <FileFormatFilter /> */}
        {/* <DeliveryFilter /> */}
        <CategoryFilter
        selectedValues={tempCategory}
        setSelectedValues={setTempCategory}
      />
    </>
    </div>
  );
}

export default Filters;