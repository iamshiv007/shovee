import React from "react";

const InputElement = ({
  handleInputChange,
  id,
  label,
  name,
  placeholder,
  required,
  type,
  value,
}) => {
  return (
    <div className={style.container}>
      {/* Label */}
      <label htmlFor={id}>
        {label}
        {!required ? (
          <span className={style.optional}>&nbsp;&nbsp;(Optional)</span>
        ) : null}{" "}
      </label>

      {/* Input */}
      <input
        className={style.input}
        id={id}
        name={name}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </div>
  );
};

export default InputElement;

const style = {
  container: "flex flex-col gap-1",
  optional: "text-gray-400",
  input:
    "md:w-[350px] px-2 py-1 dark:bg-gray-900 border border-gray-400 dark:border-gray-500 rounded",
};
