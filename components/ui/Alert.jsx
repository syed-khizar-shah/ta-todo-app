
export const Alert = ({ variant = 'default', children, className }) => {
    const baseStyles = 'p-4 rounded-lg';
    const variantStyles = {
      default: 'bg-gray-100 text-gray-800',
      destructive: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
    };
  
    return (
      <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
        {children}
      </div>
    );
  };
  