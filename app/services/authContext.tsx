import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  userInfo: {
    username: string;
    email: string;
    role: string;
    userid: string;
  } | null;
  login: (token: string, username: string, email: string, role: string ,userid: string) => void;
  logout: () => void,
  checkAuth: () => void;
}


export const AuthContext = React.createContext<AuthContextType | null>(null);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<{ username: string; email: string; role: string;userid: string } | null>(null);


  // const login = async (token: string,username:string) => {
const login = async (token: string, username: string, email: string, role: string , userid: string) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('role', role);
      await AsyncStorage.setItem('userid', userid);
      setIsAuthenticated(true);
      setUserInfo({ username, email, role,userid });
    } catch (e) {
      console.error('Failed to save the token to the storage1',e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('role');
      await AsyncStorage.removeItem('userid');
      
      setIsAuthenticated(false);
      setUserInfo(null);
    } catch (e) {
      console.error('Failed to remove the token from storage2');
    }
  };

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const storedUsername = await AsyncStorage.getItem('username');
      const storedEmail = await AsyncStorage.getItem('email');
      const storedRole = await AsyncStorage.getItem('role');
      const storeUserid = await AsyncStorage.getItem('userid');
      
      setIsAuthenticated(token !== null);
      setUserInfo(storedUsername && storedEmail && storedRole && storeUserid ? { username: storedUsername, email: storedEmail, role: storedRole,userid: storeUserid } : null);

    } catch (e) {
      console.error('Failed to fetch the token from storage',e);
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
