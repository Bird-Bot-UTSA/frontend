"use client";

import { useEffect } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  useEffect(() => {
    // Initialize theme from localStorage on app startup
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        const theme = userData.theme || 'system';
        
        applyTheme(theme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  }, []);

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      console.log('Applied dark theme');
    } else if (theme === 'light') {
      root.classList.remove('dark');
      console.log('Applied light theme');
    } else {
      // System theme - check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
        console.log('Applied system dark theme');
      } else {
        root.classList.remove('dark');
        console.log('Applied system light theme');
      }
    }
  };

  return <>{children}</>;
};

export default ThemeProvider; 