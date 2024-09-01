import React, {useEffect, useState} from 'react';
import {AuthProvider} from './context/AuthProvider';
import RootNavigator from './components/Navigation/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from './context/AuthProvider';
import SignIn from './components/Pages/SignIn';
import StartPage from './components/Pages/StartPage';
import SplashScreen from './components/SplashScreen/SplashScreen';
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
      <RootNavigator />
    </AuthProvider>
  );
}

export default App;
