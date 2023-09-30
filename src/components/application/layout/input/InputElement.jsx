"use client";
import React from "react";

export const InputElement = ({
  error,
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
    <div className='flex flex-col gap-1'>
      {/* Label */}
      <label htmlFor={id}>
        {label}
        {!required ? (
          <span className='text-gray-400'>&nbsp;&nbsp;(Optional)</span>
        ) : null}{" "}
      </label>

      {/* Input */}
      <input
        className='px-3 py-2 dark:bg-slate-900 border border-gray-400 focus:border-gray-600 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-500 dark:focus:border-gray-400 rounded'
        id={id}
        name={name}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      {/* Error Message */}
      <p className='text-sm text-red-500'>{error}</p>
    </div>
  );
};
