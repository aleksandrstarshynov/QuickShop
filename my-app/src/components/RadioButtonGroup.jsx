import React from "react";

const RadioGroup = ({ title, options, selectedValue, onChange }) => {
  return (
    <div>
      <h3>{title}</h3>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            id={option.value}
            name={title} // Радио-кнопки с одинаковым name объединяются в группу
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
