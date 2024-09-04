import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { WEB_CLIENT_ID } from '@env';
import Toast from 'react-native-toast-message';
import UUID from 'react-native-uuid';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const showToast = (message) => {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: message,
    });
  };
  const showsuccessToast = (message) => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Success',
      text2: message,
    });
  };
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
        showToast('Error loading user');
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
      
      const formattedPhoneNumber = `+91${userData.phone}`;
      const userExists = users.some(user => user.email === userData.email || user.phone === formattedPhoneNumber);
      if (userExists) {
        showToast('User with same email or phone number already exist....please signin');
        return { success: false, message: 'A user with this email already exists.' };
      }
      const newUser = { ...userData,
        user_id:UUID.v4(),
        profilePic:'', 
        phone: formattedPhoneNumber, 
        user_todos: [] 
      };
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      showsuccessToast('☺️! Registered successfully !!!');
      return { success: true, message: 'Sign up successful.' };
    } catch (error) {
      console.error('Error signing up:', error);
      showToast('Error signing up');
      return { success: false, message: 'An error occurred during sign up. Please try again later.' };
    }
  };
  
  const signin = async (email, passwordOrToken) => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      const userData = users.find(user => user.email === email);
      if (userData) {
        if (userData.password === passwordOrToken || userData.idToken === passwordOrToken) {
          setUser(userData);
          setIsLoggedIn(true);
          await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
          showsuccessToast('👍! Signed in  successfully !!!');
          return { success: true, message: 'Sign in successful.' };
        } else {
          return { success: false, message: 'Invalid password or token.' };
        }
      } else {
        return { success: false, message: 'User not found.' };
      }
    } catch (error) {
      console.error('Error signing in:', error);
      showToast('Error signing in');
      return { success: false, message: 'An error occurred during sign in. Please try again later.' };
    }
  };
  
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true,
  });
  
  const googleSignUp = async () => {
    
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      const userInfo = await GoogleSignin.signIn();
      if (!userInfo?.data?.idToken) {
        throw new Error('ID token is missing');
      }

      const checkemail = userInfo?.data?.user?.email;
      const checkphone = userInfo?.data?.user?.phoneNumber;
      console.log("checjpone",checkphone);
      
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      const userData = users.find(user => user.email === checkemail || user.phone === checkphone );
      if (userData) {
        showToast('This account is already registered please sign in');
        return true;
        
      }
      
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.data?.idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const currentUser = userCredential.user.toJSON();
      
      const newUser = {
        user_id :UUID.v4(),
        username: userInfo.data.user.name,
        email: checkemail,
        password: "notpassord",
        // password: userInfo.data.idToken,
        profilePic: userInfo.data.user.photo,
        phone: currentUser.phoneNumber || '',
        user_todos: []
      };
      
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
      setIsLoggedIn(true);
      setUser(newUser);
      showsuccessToast('☺️! Registered through Google  successfully !!!');
      return { success: true, message: 'Google sign up successful.' };
      
    } catch (error) {
      console.error('Error with Google Sign-Up:', error);
      showToast('Error signing-up with Google');
      return { success: false, message: 'An error occurred with Google sign-up. Please try again later.' };
    }
  };
  
  const googleSignIn = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      const userInfo = await GoogleSignin.signIn();
      if (!userInfo?.data?.idToken) {
        throw new Error('ID token is missing');
      }
      
      const checkemail = userInfo?.data?.user?.email;
      
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      const userData = users.find(user => user.email === checkemail);
      if (userData) {
        setUser(userData);
        showsuccessToast('👍! Signed in through google successfully !!!');
        setIsLoggedIn(true);
        await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
        return { success: true, message: 'Google sign-in successful.' };
      } else {
        showToast('This account is not registered yet please register it !');
        return { success: false, message: 'This email is not registered. Please sign up.' };
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      showToast('Error signing-in with Google');
      return { success: false, message: 'An error occurred with Google sign-in. Please try again later.' };
    }
  };
  const signInAndSignUpWithPhoneNumber = async (phoneNumber) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      showsuccessToast('OTP Sent... Wait');
      return { success: true, confirmation };
    } catch (error) {
      showToast('Error signing-in with Phone');
      console.error('Error with phone sign-in:', error);
      return { success: false, error };
    }
  };
  const confirmCodeAndSignInOrSignUp = async (phoneNumber,confirmation, code) => {
    try {
      const result = await confirmation.confirm(code);
      console.log(result,"     OTP  VERIFIED");

      const checkphone = phoneNumber;
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      console.log("users -> ",users);
      
      const userData = users.find(user => user.phone === checkphone);
      console.log("userData->  ",userData);
      if (userData) {
        setUser(userData);
        setIsLoggedIn(true);
        await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
        showsuccessToast('👍! Signed in through phone successfully !!!');
        return { success: true, message: 'Phone sign-in successful.' };

      }
      else{
        
        const newUser = {
          user_id: UUID.v4(),
          username : phoneNumber,
          email:'',
          password: '',
          profilePic:'',
          phone: phoneNumber,
          user_todos:[],
        }
          users.push(newUser);
          await AsyncStorage.setItem('users', JSON.stringify(users));
          await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
          setIsLoggedIn(true);
          setUser(newUser);
          showsuccessToast('☺️! Registered through Phone  successfully !!!');
          return { success: true, message: 'Phone number sign up successful.' };
      };
      } catch (error) {
        console.error('Error confirming OTP:', error);
        showToast('🧐 OTP not matched');
        return { success: false, error };
    }
  };
  
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      setUser(null);
      setIsLoggedIn(false);
      showsuccessToast('👋! You have been logged out successfully !!!');
    } catch (error) {
      showToast('Error Logging out');
      console.error('Error logging out:', error);
    }
  };
  
  const deleteUser = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      const updatedUsers = users.filter(u => u.user_id !== user.user_id);
      
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      await AsyncStorage.removeItem('currentUser');
      
      setUser(null);
      setIsLoggedIn(false);
      console.log("User deleted successfully");
      showsuccessToast('☠️! User ahs been deleted  successfully !!!');
    } catch (error) {
      showToast('Error Deleting User');
      console.error('Error deleting user:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signin, googleSignIn, googleSignUp, signup,confirmCodeAndSignInOrSignUp,signInAndSignUpWithPhoneNumber, logout, isLoggedIn, isLoading, deleteUser, }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

