import { useState, useEffect } from 'react';
import { UserData, getUserData, saveUserData } from '../theme';

export const useTheme = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    // Just load user data
    const userData = getUserData();
    if (userData) {
      setUser(userData);
    }
  }, []);

  const updateUser = (userData: UserData) => {
    setUser(userData);
    saveUserData(userData);
  };

  return {
    user,
    updateUser,
  };
}; 