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
        // console.log('Attempting to load current user from AsyncStorage...');
        const storedCurrentUser = await AsyncStorage.getItem('currentUser');
        if (storedCurrentUser) {
          const parsedUser = JSON.parse(storedCurrentUser);
          setUser(parsedUser);
          setIsLoggedIn(true);
          // console.log('Current user loaded successfully:', parsedUser);
        } else {
          // console.log('No user currently logged in.');
        }
      } catch (error) {
        // console.error('Error loading current user from AsyncStorage:', error);
      } finally {
        setIsLoading(false);
        // console.log('Loading user completed.');
      }
    };
    loadUser();
  }, []);

  const signup = async (userData) => {
    // console.log('Attempting to sign up with:', userData);
    try {
      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      
      // Check if a user with the same email or phone already exists
      const userExists = users.some(user => user.email === userData.email || user.phone === userData.phone);
      if (userExists) {
        // console.log('Signup failed. User with this email/phone already exists.');
        return false;
      }

      // Add new user to the list
      users.push(userData);

      await AsyncStorage.setItem('users', JSON.stringify(users));
      // console.log('Signup successful. User:', userData);
      return true;
    } catch (error) {
      // console.error('Error signing up:', error);
      return false;
    }
  };

  const signin = async (email, password) => {
    // console.log('Attempting to sign in with email:', email);
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const userData = users.find(user => user.email === email && user.password === password);

      if (userData) {
        setUser(userData);
        setIsLoggedIn(true);
        await AsyncStorage.setItem('currentUser', JSON.stringify(userData));  // Store the current logged-in user
        // console.log('Signin successful. User:', userData);
        return true;
      } else {
        // console.log('Signin failed. Invalid email or password.');
        return false;
      }
    } catch (error) {
      // console.error('Error signing in:', error);
      return false;
    }
  };

  const logout = async () => {
    // console.log('Attempting to log out...');
    try {
      await AsyncStorage.removeItem('currentUser'); // Remove only the current user reference
      setUser(null);
      setIsLoggedIn(false);
      // console.log('Logout successful.');
    } catch (error) {
      // console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signin, signup, logout, isLoggedIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
