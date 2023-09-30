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
    <div className='flex flex-col gap-1'>
      {/* Lable */}
      <label htmlFor={id}>
        {label}
        {!required ? (
          <span className='text-gray-400'>&nbsp;&nbsp;(Optional)</span>
        ) : null}{" "}
      </label>

      {/* Input Textarea */}
      <textarea
        className='md:w-[350px] px-2 py-1 dark:bg-gray-900 border border-gray-400 dark:border-gray-500 rounded'
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
