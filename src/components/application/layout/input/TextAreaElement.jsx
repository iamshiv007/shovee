import React from "react";

export const TextAreaElement = ({
  handleInputChange,
  id,
  name,
  label,
  placeholder,
  required,
  rows,
  value,
}) => {
  return (
    <div className='flex flex-col gap-1'>
      {/* Label */}
      <label htmlFor={id}>
        {label}
        {!required ? (
          <span className='text-gray-400'>&nbsp;&nbsp;(Optional)</span>
        ) : null}{" "}
      </label>

      {/* Input Textarea */}
      <textarea
        className='px-3 py-2 dark:bg-slate-900 border border-gray-400 focus:border-gray-600 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-500 dark:focus:border-gray-400 rounded'
        id={id}
        name={name}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        value={value}
      />
    </div>
  );
};
