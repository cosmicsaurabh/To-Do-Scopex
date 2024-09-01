import React, {useEffect, useState} from 'react';
import {AuthProvider} from './context/AuthProvider';
import RootNavigator from './components/Navigation/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from './context/AuthProvider';
import SignIn from './components/Pages/SignIn';
import HomePage from './components/Pages/HomePage';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Toast from 'react-native-toast-message';
import TodoProvider from './context/TodoProvider';

function App(): JSX.Element {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    },500);

    return () => clearTimeout(timer);
  }, []);
  if (showSplash) {
    return <SplashScreen />; 
  }

  return (
    <AuthProvider>
      <TodoProvider>
      <RootNavigator />
      <Toast />
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;
