import React from 'react';

export const Input = ({ id, name, type, value, onChange, placeholder, disabled, required }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      disabled={disabled}
      required={required}
    />
  );
};
