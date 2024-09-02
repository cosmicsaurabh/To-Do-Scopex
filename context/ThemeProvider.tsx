// ThemeProvider.js
import React, {useEffect, createContext, useState, useContext, useMemo } from 'react';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme !== null) {
          setIsDarkTheme(storedTheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    setIsDarkTheme(!isDarkTheme);
    try {
      await AsyncStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const theme = useMemo(() => (isDarkTheme ? DarkTheme : DefaultTheme), [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export default ThemeProvider;
