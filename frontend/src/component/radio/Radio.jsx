import React from "react";
import "../radio/radio.css";

const Select = ({ onChange, value }) => {
  let genderList = [
    {
      value: "female",
      label: "Female",
    },
    {
      value: "male",
      label: "Male",
    },
    {
      value: "others",
      label: "Others",
    },
  ];
  return (
    <div className="form-container">
      <label className="label1">Gender :</label>
      <select value={value} onChange={onChange}>
        <option disabled={true}>Select Gender</option>
        {genderList.map((gender, i) => {
          return (
            <option key={i} value={gender.value}>
              {gender.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
