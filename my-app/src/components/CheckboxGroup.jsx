import React from "react";

const CheckboxGroup = ({ title, options, selectedValues, onChange }) => {
  const handleChange = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
   <div className="mb-4 checkbox-group">
      <h4 className="font-bold mb-2">{title}</h4>
      {options.map(({ label, value }) => (
        <label key={value} className="block mb-1">
          <input
            type="checkbox"
            checked={selectedValues.includes(value)}
            onChange={() => handleChange(value)}
            className="mr-2"
          />
          {label}
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
