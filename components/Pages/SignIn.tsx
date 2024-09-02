import React, { useState } from 'react';
import { SafeAreaView,View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormField from '../FormField';
import { useAuth } from '../../context/AuthProvider';
import { useTheme } from '../../context/ThemeProvider';

const SignIn = () => {
  const navigation = useNavigation();
  const {theme}  =useTheme();
  console.log(theme);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const { signin } = useAuth();
  const backgroundStyle = {
    backgroundColor: theme.colors.background,
  };

  const handleLogin = async () => {
    if (form.email && form.password) {
      const success = await signin(form.email, form.password);
      if (success) {
      } else {
        alert('Invalid email or password');
      }
    } else {
      alert('Please fill in both email and password.');
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

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={[styles.buttonText,{ color: theme.colors.text }]}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupButton}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

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
});

export default SignIn;
