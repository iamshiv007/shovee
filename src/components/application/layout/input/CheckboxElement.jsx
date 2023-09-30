import React from "react";

const CheckboxElement = ({ checked, name, handleInputChange, value }) => {
  return (
    <div>
      {/* Checkbox Input */}
      <input
        checked={checked}
        className='w-4 h-4 hover:cursor-pointer'
        name={name}
        onChange={handleInputChange}
        type={"checkbox"}
        value={value}
      />
    </div>
  );
};

export default CheckboxElement;
