import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../../context/AuthProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../SplashScreen/SplashScreen';


const Stack = createNativeStackNavigator();
const RootNavigator = () => {
  const { isLoggedIn,isLoading} = useAuth();

  
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
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
