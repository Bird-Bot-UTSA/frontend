import React from 'react';

interface GradientBackgroundProps {
  className?: string;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ className = "" }) => {
  return (
    <div
      className={`fixed inset-0 before:absolute before:h-[300px] before:w-[400px] before:left-1/2 before:top-[47%] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[200px] after:w-[300px] after:left-1/2 after:top-[47%] after:-translate-x-1/2 after:-translate-y-1/2 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[350px] before:lg:w-[500px] after:lg:h-[250px] after:lg:w-[400px] ${className}`}
    />
  );
};

export default GradientBackground; 