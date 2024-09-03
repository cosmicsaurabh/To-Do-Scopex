import React, { useState } from 'react';
import { SafeAreaView,View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormField from '../FormField';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/AuthProvider';
import { useTheme } from '../../context/ThemeProvider';

const SignIn = () => {
  const navigation = useNavigation();
  const {theme}  =useTheme();
  const [errorText, setErrorText] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const { signin,googleSignIn } = useAuth();
  const backgroundStyle = {
    backgroundColor: theme.colors.background,
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!isValidEmail(form.email)) {
      setErrorText('Please enter a valid email address.');
      return;
    }
    if (!form.email || !form.password) {
      setErrorText('Please fill in both email and password.');
      return;
    }
    setErrorText('');
    try{
      const success = await signin(form.email, form.password);
      if ( !success) {
        setErrorText("Credentials don't match 🧐... try again");
      } 
    } catch (error) {
      console.error('Login Error:', error);
      setErrorText('Something went Wrong from our side.....try again later');
    }
    
  };

  const handleGoogleSignIn = async () => {
    try{
    const success = await googleSignIn();
    if ( !success) {
      setErrorText('Failed to sign in with Google.....try again later');
    } 
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    setErrorText('Something went Wrong from our side.....try again later');
  }
  };

  return (
    <SafeAreaView style={[styles.safearea, backgroundStyle]}>
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.formContainer}>

        <FormField
          title="Email"
          value={form.email}
          placeholder="Email"
          handleChangeText={(e) => setForm({ ...form, email: e })}
        />
        <FormField
          title="Password"
          value={form.password}
          placeholder="Password"
          handleChangeText={(e) => setForm({ ...form, password: e })}
          secureTextEntry
        />

          {errorText ? 
          (<Text style={styles.errorText}>{errorText}</Text>
           ) :( null)
          }

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={[styles.buttonText,{ color: theme.colors.text }]}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGoogleSignIn} style={styles.googleButton}>
        <Icon name="logo-google" size={24} color="white" />
            <Text style={styles.buttonText}> Log In</Text>
          </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupButton} >Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};
export default SignIn;

const styles = StyleSheet.create({
  safearea: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    backgroundColor:'#1E1E2D',
  },
  
  loginButton: {
    marginVertical: 20,
    elevation: 8,
    backgroundColor: "#fbc02d",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  googleButton: {
    flexGrow:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginVertical: 20,
    elevation: 8,
    backgroundColor: "#db4437",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    color: "#CDCDE0",
  },
  signupButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center', 
  },
});

