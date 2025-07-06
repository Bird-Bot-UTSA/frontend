import React from 'react';

interface GradientBackgroundProps {
  className?: string;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ className = "" }) => {
  return (
    <div
      className={`fixed inset-0 bg-pms289 before:absolute before:h-[500px] before:w-[700px] before:left-1/2 before:top-[47%] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gradient-radial before:from-pms1665 before:to-transparent before:blur-3xl before:content-[''] after:absolute after:-z-20 after:h-[400px] after:w-[600px] after:left-1/2 after:top-[47%] after:-translate-x-1/2 after:-translate-y-1/2 after:bg-gradient-conic after:from-pms1665 after:via-pms1665 after:to-transparent after:blur-3xl after:content-[''] before:dark:from-pms1665 before:dark:to-transparent before:dark:opacity-30 after:dark:from-pms1665 after:dark:via-pms1665 after:dark:to-transparent after:dark:opacity-40 before:lg:h-[600px] before:lg:w-[900px] after:lg:h-[500px] after:lg:w-[800px] ${className}`}
    />
  );
};

export default GradientBackground; 