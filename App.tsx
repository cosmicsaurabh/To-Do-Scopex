import React, {useEffect, useState} from 'react';
import {AuthProvider} from './context/AuthProvider';
import RootNavigator from './components/Navigation/RootNavigator';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Toast from 'react-native-toast-message';
import TodoProvider from './context/TodoProvider';
import { ThemeProvider } from './context/ThemeProvider';

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
      <ThemeProvider>
        <TodoProvider>
          <RootNavigator />
          <Toast />
        </TodoProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
