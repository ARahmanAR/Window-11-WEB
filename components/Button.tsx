
// components/Button.tsx
import React from 'react';
import { useSettingsStore } from '../store/settingsStore.ts';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const { theme } = useSettingsStore();

  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors duration-250 flex items-center justify-center gap-2';
  let variantStyles = '';

  if (variant === 'primary') {
    variantStyles = `bg-accent-1 text-white hover:bg-accent-2 focus:ring-2 focus:ring-accent-1 focus:ring-opacity-50`;
  } else if (variant === 'secondary') {
    variantStyles = `border ${theme === 'light' ? 'border-gray-300 text-gray-800 bg-white hover:bg-gray-100' : 'border-gray-700 text-gray-200 bg-gray-800 hover:bg-gray-700'} focus:ring-2 focus:ring-accent-1 focus:ring-opacity-50`;
  } else if (variant === 'ghost') {
    variantStyles = `${theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-700'} focus:ring-2 focus:ring-accent-1 focus:ring-opacity-50`;
  }

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;