export type Theme = 'light' | 'dark' | 'system';

export interface UserData {
  name: string;
  email: string;
  language: string;
  theme: Theme;
}

export const applyTheme = (theme: Theme): void => {
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

export const initializeTheme = (): void => {
  try {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData: UserData = JSON.parse(savedUser);
      applyTheme(userData.theme || 'system');
    } else {
      // Apply system theme by default if no user data exists
      applyTheme('system');
    }
  } catch (error) {
    console.error('Error loading theme:', error);
    // Apply system theme as fallback
    applyTheme('system');
  }
};

export const saveUserData = (userData: UserData): void => {
  localStorage.setItem('user', JSON.stringify(userData));
};

export const getUserData = (): UserData | null => {
  try {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
};

export const updateUserTheme = (theme: Theme): void => {
  const userData = getUserData();
  if (userData) {
    userData.theme = theme;
    saveUserData(userData);
    applyTheme(theme);
  }
}; 