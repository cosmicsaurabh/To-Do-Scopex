/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect,useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';

import SplashScreen from './components/SplashScreen/SplashScreen';
import StartPage from './components/Pages/StartPage';
import { NavigationContainer } from "@react-navigation/native";
import {Colors} from 'react-native/Libraries/NewAppScreen';



function App(): JSX.Element {
  

  const [isNavigationIsReady, setNavigationIsReady] = useState(true);
  const [showSplash,setShowSplash] = useState(true);
  

  useEffect(() => {
    const timer = 
    setTimeout(() => {
      setShowSplash(false);
    }, );

    return () => clearTimeout(timer);
  }, []);
  

  return (

      <NavigationContainer >
      {showSplash ? <SplashScreen /> : <StartPage/> }
      </NavigationContainer>
      
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   todoItem: {
//     fontSize: 18,
//     fontWeight: '400',
//     borderBottomWidth: 1,
//     padding: 8,
//     borderBottomColor: 'gray',
//   },
// });

export default App;
