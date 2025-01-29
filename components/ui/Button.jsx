import React from 'react';

export const Button = ({ type, onClick, className, disabled, children, variant }) => {
  const baseStyles = "px-4 py-2 rounded-md focus:outline-none";
  const disabledStyles = "bg-gray-400 cursor-not-allowed";
  const primaryStyles = "bg-blue-600 text-white hover:bg-blue-700";
  const outlineStyles = "border-2 border-blue-600 text-blue-600 hover:bg-blue-100";

  const variantStyles = variant === 'outline' ? outlineStyles : primaryStyles;
  const finalClassName = `${baseStyles} ${variantStyles} ${disabled ? disabledStyles : ''} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={finalClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
