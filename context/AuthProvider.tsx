import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {WEB_CLIENT_ID} from '@env';

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
        //console.log('User with this email already exists.');
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

  const signin = async (email, passwordOrToken) => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const userData = users.find(user => user.email === email );
      if (userData) {
        if (userData.password === passwordOrToken || userData.idToken === passwordOrToken) {
          setUser(userData);
          setIsLoggedIn(true);
          await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
          //console.log("google se",  userData)
          return true;
        }
      } else {
        console.log('Invalid email or password.');
        return false;
      }
    } catch (error) {
      console.error('Error signing in:', error);
      return false;
    }
  };
  GoogleSignin.configure({
    webClientId: process.env.WEB_CLIENT_ID,
    // webClientId: '656316410498-c9ko9e1uvo9ihq0c9veno2rvrmh75ge2.apps.googleusercontent.com',
    offlineAccess: true,
    // scopes: ['profile', 'email'], // Ensure proper scopes
  });


  const googleSignUp = async () => {
    try {
      //console.log("Attempting Google Sign-Up");
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      //console.log("Play Services available su");
  
      const userInfo = await GoogleSignin.signIn();

      if (!userInfo.data?.idToken) {
        throw new Error('ID token is missing su');
      }
      
      const checkemail = userInfo?.data?.user?.email;

      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const userData = users.find(user => user.email === checkemail );
      if (userData) {
        //console.log(' This gmail is already registered please signin instead of registering.');
        return false;
      } 
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.data?.idToken);
      //console.log("google credential su ", googleCredential);
  
      const userCredential = await auth().signInWithCredential(googleCredential);
      const currentUser = userCredential.user.toJSON();
      //console.log("current su",  currentUser);


      const newUser = { email :checkemail,
        password : userInfo.data.idToken,
        username : userInfo.data.user.name,
        profilePic : userInfo.data.user.photo,
        phone : currentUser.phoneNumber || '',
        todos:[]
      }
        users.push(newUser);
        await AsyncStorage.setItem('users', JSON.stringify(users));
        await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
        //console.log("google se signup pe ->",  newUser)
        setIsLoggedIn(true);
        setUser(newUser);
        return true;
      
    } catch (error) {
      console.error('Error with Google Sign-Up:', JSON.stringify(error));
      return false;
    }

  };


  const googleSignIn = async () => {
    try {
      //console.log("Attempting Google Sign-In");
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      //console.log("Play Services available");
  
      const userInfo = await GoogleSignin.signIn();

      if (!userInfo.data?.idToken) {
        throw new Error('ID token is missing');
      }

      const checkemail = userInfo?.data?.user?.email;

      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const userData = users.find(user => user.email === checkemail );
      if (userData) {
          setUser(userData);
          setIsLoggedIn(true);
          await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
          //console.log("google se",  userData)
          return true;
      } else {
        console.log(' This gmail is Not registered yet please register.');
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
  
  
  
  const verifyOtp = async (confirmation, code) => {
    try {
      // await confirmation.confirm(code);
      // const currentUser = auth().currentUser.toJSON();
      // setUser(currentUser);
      // setIsLoggedIn(true);
      // await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
      return true;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
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
    <AuthContext.Provider value={{ user, signin,googleSignIn,googleSignUp, verifyOtp, signup, logout, isLoggedIn, isLoading,deleteuser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


