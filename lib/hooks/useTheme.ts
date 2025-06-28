import { useState, useEffect } from 'react';
import { Theme, UserData, getUserData, saveUserData, applyTheme } from '../theme';

export const useTheme = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    // Just load user data, don't initialize theme (handled globally)
    const userData = getUserData();
    if (userData) {
      setUser(userData);
    }
  }, []);

  const updateTheme = (theme: Theme) => {
    if (user) {
      const updatedUser = { ...user, theme };
      setUser(updatedUser);
      saveUserData(updatedUser);
      applyTheme(theme);
    } else {
      // Apply theme even if no user exists
      applyTheme(theme);
    }
  };

  const updateUser = (userData: UserData) => {
    setUser(userData);
    saveUserData(userData);
    applyTheme(userData.theme);
  };

  return {
    user,
    updateTheme,
    updateUser,
  };
}; 