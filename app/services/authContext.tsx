import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void,
  checkAuth: () => void;
}


export const AuthContext = React.createContext<AuthContextType | null>(null);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      setIsAuthenticated(true);
    } catch (e) {
      console.error('Failed to save the token to the storage');
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setIsAuthenticated(false);
    } catch (e) {
      console.error('Failed to remove the token from storage');
    }
  };

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(token !== null);
    } catch (e) {
      console.error('Failed to fetch the token from storage');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
