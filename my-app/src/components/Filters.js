// import CategoriesFilter from "./CategoriesFilter.js";
import LanguageFilter from "./LanguageFilter.js";
 import FileFormatFilter from "./FileFormatFilter.js";
// import DeliveryFilter from "./DeliveryFilter.js";

function Filters() {  
  return (
    <div className="filters">
    <>
        <h2>Filters</h2>
        {/* <CategoriesFilter /> */}
        <LanguageFilter />
        <FileFormatFilter />
        {/* <DeliveryFilter /> */}
    </>
    </div>
  );
}

export default Filters;