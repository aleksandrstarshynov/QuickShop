// import React, { useState } from "react";
// import RadioButtonGroup from "./RadioButtonGroup";
// // import { filters } from "../mocked_DB/filters";

// const FileFormatFilter = () => {
//   const [selectedFormat, setSelectedFormat] = useState("");

//   const fileFormatFilter = filters.find((f) => f.name === "fileFormat");
//   const options = (fileFormatFilter?.options || []).map((value) => ({
//     label: value,
//     value: value,
//   }));

//   return (
//     <RadioButtonGroup
//       title="File format"
//       options={options}
//       selectedValue={selectedFormat}
//       onChange={setSelectedFormat}
//     />
//   );
// };

// export default FileFormatFilter;
