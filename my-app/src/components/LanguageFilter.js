import React, { useState } from "react";
import CheckboxGroup from "./CheckboxGroup";
import { filters } from "../mocked_DB/filters";

const Filters = () => {
  const [selected, setSelected] = useState({});

  const handleChange = (name, values) => {
    setSelected((prev) => ({
      ...prev,
      [name]: values,
    }));
  };

  // Фильтруем только фильтр с нужным названием, например, "Language"
  const languageFilter = filters.find((filter) => filter.name === "Language");

  if (!languageFilter) {
    return <div>No Language filter available</div>;
  }

  return (
    <div>
      <CheckboxGroup
        key={languageFilter.name}
        title={languageFilter.name}
        options={languageFilter.options.map((value) => ({
          label: value,
          value: value,
        }))}
        selectedValues={selected[languageFilter.name] || []}
        onChange={(values) => handleChange(languageFilter.name, values)}
      />
    </div>
  );
};

export default Filters;
