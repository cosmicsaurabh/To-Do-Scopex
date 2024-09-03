import React, { useState } from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import FormField from '../FormField';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthProvider';
import { useTheme } from '../../context/ThemeProvider';
import Icon from 'react-native-vector-icons/Ionicons';


const SignUp = () => {
  const { signup,googleSignUp } = useAuth();
  const {theme} = useTheme();
  const navigation = useNavigation();
  const [errorText, setErrorText] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
    phone: '',
    username: '',
  });

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const isValidPhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };


  const backgroundStyle = {
    backgroundColor: theme.colors.background,
  };

  const handleSignUp = async () => {
    const { email, password, username, phone } = form;

    if (!email || !password || !username || !phone) {
      setErrorText('Please fill in all fields.');
      return;
    }

    if (!isValidPhone(phone)) {
      setErrorText('Invalid phone number.');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorText('Invalid email address.');
      return;
    }

    setErrorText('');

    try {
      const success = await signup(form);
      if (!success) {
        setErrorText('Sign up failed. Please try again.');
      } else {
        navigation.navigate('SignIn');
      }
    } catch (error) {
      console.error('Sign Up Error:', error);
      setErrorText('Something went wrong. Please try again later.');
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const success = await googleSignUp();
      if (!success) {
        setErrorText('Failed to sign up with Google. Please try again.');
      } 
    } catch (error) {
      console.error('Google Sign-Up Error:', error);
      setErrorText('Something went wrong with Google sign-up. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={[styles.safearea, backgroundStyle]}>
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.formContainer}>


        <FormField
          title="Username"
          value={form.username}
          placeholder="Username"
          handleChangeText={(e) => setForm({ ...form, username: e })}
        />
        <FormField
          title="Phone"
          value={form.phone}
          placeholder="Phone"
          handleChangeText={(e) => setForm({ ...form, phone: e })}
        />
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
        {errorText ? (
            <Text style={styles.errorText}>{errorText}</Text>
          ) : null}
        <TouchableOpacity onPress={handleSignUp} style={styles.signupButton}>
        <Text style={[styles.buttonText,{ color: theme.colors.text }]}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGoogleSignUp} style={styles.googleButton}>
        <Icon name="logo-google" size={24} color="white" />
            <Text style={styles.buttonText}> Sign Up</Text>
          </TouchableOpacity>



        <View style={styles.signinContainer}>
          <Text style={styles.signinText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signinButton}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};
export default SignUp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor:'#1E1E2D',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  signupButton: {
    marginVertical: 20,
    elevation: 8,
    backgroundColor: "#fbc02d",
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
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signinText: {
    fontSize: 16,
    color: "#CDCDE0",
  },
  signinButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginLeft: 5,
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
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center', 
  },
});

