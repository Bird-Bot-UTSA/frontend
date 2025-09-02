export interface UserData {
  name: string;
  email: string;
  language: string;
  uid?: string;
}

export const initializeTheme = (): void => {
  // Remove any dark class that might exist
  const root = document.documentElement;
  root.classList.remove('dark');
  console.log('Applied light theme (dark mode disabled)');
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

 