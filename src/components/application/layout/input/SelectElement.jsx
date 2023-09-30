import React, { Fragment } from "react";

export const SelectElement = ({
  handleInputChange,
  id,
  label,
  name,
  placeholder,
  required,
  value,
  selectOptions,
}) => {
  return (
    <Fragment>
      <div className='flex flex-col gap-1'>
        {/* Label */}
        <label htmlFor={id}>
          {label}
          {!required ? (
            <span className='text-gray-400'>&nbsp;&nbsp;(Optional)</span>
          ) : null}{" "}
        </label>

        {/* Select Dropdown */}
        <select
          className='px-3 py-2 dark:bg-slate-900 border border-gray-400 focus:border-gray-600 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-500 dark:focus:border-gray-400 rounded'
          id={id}
          name={name}
          onChange={handleInputChange}
          required={required}
          value={value}
        >
          <option className='dark:bg-gray-600' value=''>
            {placeholder}
          </option>

          {/* Map over profile options */}
          {selectOptions.map((option) => (
            <option className='dark:bg-gray-600' key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </Fragment>
  );
};
