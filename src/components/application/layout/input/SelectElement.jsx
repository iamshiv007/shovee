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
      <div className={styles.container}>
        {/* Label */}
        <label htmlFor={id}>
          {label}
          {!required ? (
            <span className={styles.optional}>&nbsp;&nbsp;(Optional)</span>
          ) : null}{" "}
        </label>

        {/* Select Dropdown */}
        <select
          className={styles.select}
          id={id}
          name={name}
          onChange={handleInputChange}
          required={required}
          value={value}
        >
          <option className={styles.option} value=''>
            {placeholder}
          </option>

          {/* Map over profile options */}
          {selectOptions.map((option) => (
            <option className={styles.option} key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </Fragment>
  );
};

const styles = {
  container: "flex flex-col gap-1",
  select:
    "px-3 py-2 dark:bg-slate-900 border border-gray-400 focus:border-gray-600 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-500 dark:focus:border-gray-400 rounded",
  optional: "text-gray-400",
  option: "dark:bg-gray-600",
};
