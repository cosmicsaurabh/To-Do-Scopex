



import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('currentUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const signup = async (userData) => {
    try {
      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const userExists = users.some(user => user.email === userData.email);
      if (userExists) {
        console.log('User with this email already exists.');
        return false;
      }

      const newUser = { ...userData, todos: [] };
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Error signing up:', error);
      return false;
    }
  };

  const signin = async (email, password) => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const userData = users.find(user => user.email === email && user.password === password);
      if (userData) {
        setUser(userData);
        setIsLoggedIn(true);
        await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
        return true;
      } else {
        console.log('Invalid email or password.');
        return false;
      }
    } catch (error) {
      console.error('Error signing in:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const deleteuser = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const updatedUsers = users.filter(u => u.email !== user.email);

      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

      await AsyncStorage.removeItem('currentUser');

      setUser(null);
      setIsLoggedIn(false);

      console.log("User deleted successfully");
    } catch (error) {
      console.error('Error deleting user:', error);
    }
};

  return (
    <AuthContext.Provider value={{ user, signin, signup, logout, isLoggedIn, isLoading,deleteuser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
