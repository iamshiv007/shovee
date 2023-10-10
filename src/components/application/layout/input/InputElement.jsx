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
    <div className={styles.container}>
      {/* Label */}
      <label htmlFor={id}>
        {label}
        {!required ? (
          <span className={styles.optional}>&nbsp;&nbsp;(Optional)</span>
        ) : null}{" "}
      </label>

      {/* Input */}
      <input
        className={styles.input}
        id={id}
        name={name}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      {/* Error Message */}
      <p className={styles.error}>{error}</p>
    </div>
  );
};

const styles = {
  container: "flex flex-col gap-1",
  input:
    "px-3 py-2 dark:bg-slate-900 border border-gray-400 focus:border-gray-600 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-500 dark:focus:border-gray-400 rounded",
  error: "'text-sm text-red-500'",
};
