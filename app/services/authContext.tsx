import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  userInfo: {
    username: string;
    email: string;
    role: string;
  } | null;
  login: (token: string, username: string, email: string, role: string) => void;
  logout: () => void,
  checkAuth: () => void;
}


export const AuthContext = React.createContext<AuthContextType | null>(null);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<{ username: string; email: string; role: string } | null>(null);


  // const login = async (token: string,username:string) => {
const login = async (token: string, username: string, email: string, role: string) => {

    try {
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('role', role);
      setIsAuthenticated(true);
      setUserInfo({ username, email, role });
    } catch (e) {
      console.error('Failed to save the token to the storage');
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('role');
      
      setIsAuthenticated(false);
      setUserInfo(null);
    } catch (e) {
      console.error('Failed to remove the token from storage');
    }
  };

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const storedUsername = await AsyncStorage.getItem('username');
      const storedEmail = await AsyncStorage.getItem('email');
      const storedRole = await AsyncStorage.getItem('role');
      
      setIsAuthenticated(token !== null);
      setUserInfo(storedUsername && storedEmail && storedRole ? { username: storedUsername, email: storedEmail, role: storedRole } : null);

    } catch (e) {
      console.error('Failed to fetch the token from storage');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout, checkAuth }}>

      {children}
    </AuthContext.Provider>
  );
};
