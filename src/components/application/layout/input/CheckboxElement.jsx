import React from "react";

const CheckboxElement = ({ checked, name, handleInputChange, value }) => {
  return (
    <div>
      {/* Checkbox Input */}
      <input
        checked={checked}
        className={styles.input}
        name={name}
        onChange={handleInputChange}
        type={"checkbox"}
        value={value}
      />
    </div>
  );
};

export default CheckboxElement;

const styles = {
  input: "w-4 h-4 hover:cursor-pointer",
};
