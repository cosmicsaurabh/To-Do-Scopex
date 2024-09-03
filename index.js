/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const firebaseConfig = {
  // Your Firebase configuration
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}




// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '1045679207464-dtv178hon41jrgtl2vdrmspksdchbjbg.apps.googleusercontent.com', // From Firebase Console settings
  offlineAccess: true,
});





AppRegistry.registerComponent(appName, () => App);
