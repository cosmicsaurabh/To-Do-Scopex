import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormField from '../FormField';
import { useAuth } from '../../context/AuthProvider';
import { useTheme } from '../../context/ThemeProvider'; // Import your custom theme hook

const SignIn = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const { signin } = useAuth();
  const { theme } = useTheme(); // Access the current theme
  const styles = createStyles(theme); // Generate styles based on the current theme

  const handleLogin = async () => {
    if (form.email && form.password) {
      const success = await signin(form.email, form.password);
      if (success) {
        // Navigate to the start page or any other page
      } else {
        alert('Invalid email or password');
      }
    } else {
      alert('Please fill in both email and password.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login ToDo</Text>

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
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupButton}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// Create themed styles based on the current theme
const createStyles = (theme) => StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: theme === 'dark' ? '#333333' : '#f4f4f4', // Conditional background color
  },
  formContainer: {
    backgroundColor: theme === 'dark' ? '#444444' : '#ffffff', // Conditional form background
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: theme === 'dark' ? '#fbc02d' : '#333333', // Conditional text color
  },
  loginButton: {
    marginVertical: 20,
    elevation: 8,
    backgroundColor: "#fbc02d",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
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
    color: theme === 'dark' ? '#fbc02d' : '#333333', // Conditional text color
  },
  signupButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginLeft: 5,
  },
});

export default SignIn;
