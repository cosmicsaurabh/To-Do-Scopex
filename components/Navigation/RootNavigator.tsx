import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../../context/AuthProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import SplashScreen from '../SplashScreen/SplashScreen';
import { StatusBar } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';


const RootNavigator = () => {
  const { isLoggedIn,isLoading} = useAuth();
  const { theme } = useTheme();
 
  if (isLoading) {
    return <SplashScreen />; 
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={theme} >
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
