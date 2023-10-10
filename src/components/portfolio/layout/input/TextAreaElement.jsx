import React from "react";

const TextAreaElement = ({
  cols,
  handleInputChange,
  id,
  label,
  name,
  placeholder,
  required,
  value,
}) => {
  return (
    <div className={style.container}>
      {/* Lable */}
      <label htmlFor={id}>
        {label}
        {!required ? (
          <span className={style.optional}>&nbsp;&nbsp;(Optional)</span>
        ) : null}{" "}
      </label>

      {/* Input Textarea */}
      <textarea
        className={style.textArea}
        cols={cols}
        id={id}
        name={name}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={required}
        value={value}
      />
    </div>
  );
};

export default TextAreaElement;

const style = {
  container: "flex flex-col gap-1",
  optional: "text-gray-400",
  textArea:
    "md:w-[350px] px-2 py-1 dark:bg-gray-900 border border-gray-400 dark:border-gray-500 rounded",
};
