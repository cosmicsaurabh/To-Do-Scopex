import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import FormField from '../FormField';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthProvider';

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    phone: '',
    username: '',
  });

  const { signup } = useAuth();
  const navigation = useNavigation();

  const handleSignUp = () => {
    if (form.email && form.password && form.username && form.phone) {
      signup(form);
      navigation.navigate('SignIn');
    } else {
      alert('Please fill in all fields');
    }
    console.log(form);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Register ToDo</Text>

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
        <TouchableOpacity onPress={handleSignUp} style={styles.signupButton}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.signinContainer}>
          <Text style={styles.signinText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signinButton}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4', // Light background for contrast
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
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
    color: "#ffffff",
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
    color: '#333333',
  },
  signinButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginLeft: 5,
  },
});

export default SignUp;
