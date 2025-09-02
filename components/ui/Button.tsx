import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-colors duration-200 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-400',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 