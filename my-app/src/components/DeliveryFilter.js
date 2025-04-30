import React from "react";
import CheckboxGroup from "./CheckboxGroup";
import { filters } from "../mocked_DB/filters";

const DeliveryFilter = ({ selected, onChange }) => {
  const deliveryFilter = filters.find((filter) => filter.name === "Delivery");
  const options = (deliveryFilter?.options || []).map((value) => ({
    label: value,
    value: value,
  }));

  return (
    <CheckboxGroup
      title="Delivery"
      options={options}
      selectedValues={selected}
      onChange={onChange}
    />
  );
};

export default DeliveryFilter;
