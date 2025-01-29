import React from 'react';

export const Button = ({ type, onClick, className, disabled, children, variant }) => {
  const baseStyles = "px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:-translate-y-0.5 active:translate-y-0";
  const disabledStyles = "bg-gray-400 cursor-not-allowed opacity-75 hover:transform-none";
  const primaryStyles = "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg focus:ring-blue-500";
  const outlineStyles = "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 shadow-sm hover:shadow focus:ring-blue-500 bg-white";

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
