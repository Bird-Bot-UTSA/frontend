import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-xl border border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export default Card; 