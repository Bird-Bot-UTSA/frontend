import React from 'react';
import GradientBackground from './GradientBackground';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, className = '' }) => {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-24 relative ${className}`}>
      <GradientBackground />
      <div className="z-10 w-full">
        {children}
      </div>
    </main>
  );
};

export default PageLayout; 