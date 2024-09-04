import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FormField from '../FormField';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../context/AuthProvider';
import {useTheme} from '../../context/ThemeProvider';
import ToggleSwitch from 'toggle-switch-react-native';
import {SuccessToast} from 'react-native-toast-message';


const SignIn = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const [errorText, setErrorText] = useState('');
  const [confirmation, setConfirmation] = useState(null); // Store confirmation object
  const [form, setForm] = useState({
    email: '',
    password: '',
    phone: '',
    otp: '',
  });
  const {signin, googleSignIn, signInAndSignUpWithPhoneNumber,confirmCodeAndSignInOrSignUp} = useAuth();
  // const { signin,googleSignIn} = useAuth();
  const backgroundStyle = {
    backgroundColor: theme.colors.background,
  };
  const [toggledtophone, setToggledtophone] = useState(false);
  const handleToggle = () => {
    setToggledtophone(!toggledtophone);
  };

  const isValidEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const isValidPhone = phone => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };


  const handlePhoneLoginSignup = async () => {
    if (!isValidPhone(form.phone)) {
      setErrorText('Please enter a valid phone number.');
      return;
    }
    const formattedPhoneNumber = `+91${form.phone}`; 
    setErrorText('');
    try {
      const { success, confirmation: confirm } = await signInAndSignUpWithPhoneNumber(formattedPhoneNumber);     
       SuccessToast('tapped');
       if (success) {
        setConfirmation(confirm);
      } else {
        setErrorText('Failed to send OTP.');
      }
    } catch (error) {
      console.error('Signin Error', error);
      setErrorText('Error signing in with phone number.');
    }
  };

  const handleOTPVerification = async () => {
    if (!form.otp) {
      setErrorText('Please enter the OTP.');
      return;
    }
    setErrorText('');
    const formattedPhoneNumber = `+91${form.phone}`; 
    try {
      const { success, message } = await confirmCodeAndSignInOrSignUp(formattedPhoneNumber, confirmation, form.otp);
      if (success) {
        // Handle successful login or sign-up
        console.log(message);
      } else {
        setErrorText('Failed to verify OTP.');
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      setErrorText('Error verifying OTP.');
    }
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
    try {
      const success = await signin(form.email, form.password);
      if (!success) {
        setErrorText("Credentials don't match 🧐... try again");
      }
    } catch (error) {
      console.error('Login Error:', error);
      setErrorText('Something went Wrong from our side.....try again later');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const success = await googleSignIn();
      if (!success) {
        setErrorText('Failed to sign in with Google.....try again later');
        console.log('check');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setErrorText('Something went Wrong from our side.....try again later');
    }
  };

  return (
    <SafeAreaView style={[styles.safearea, backgroundStyle]}>
      <ScrollView contentContainerStyle={styles.container}>
          <View style = {styles.togglecontainer }>
        <Icon
              name={!toggledtophone ? 'phone-portrait-outline' : 'mail-outline'}
              size={40}
              color={theme.colors.text}
              style={styles.themeIcon}
              />

        <ToggleSwitch
          isOn={toggledtophone}
          offColor="#4E4E50"
          onColor="#4E4E50"
          labelStyle={{color: theme.colors.text, fontWeight: '600'}}
          size="large"
          onToggle={handleToggle}
          />
          </View>
        {!toggledtophone ? (
          <View style={styles.formContainer}>
            <FormField
              title="Email"
              value={form.email}
              placeholder="Email"
              handleChangeText={e => setForm({...form, email: e})}
            />
            <FormField
              title="Password"
              value={form.password}
              placeholder="Password"
              handleChangeText={e => setForm({...form, password: e})}
              secureTextEntry
              />
            {errorText ? (
              <Text style={styles.errorText}>{errorText}</Text>
            ) : null}
            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
              <Text style={[styles.buttonText, {color: theme.colors.text}]}>
                Log in
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleGoogleSignIn}
              style={styles.googleButton}>
              <Icon name="logo-google" size={24} color="white" />
              <Text style={styles.buttonText}> Log In</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signupButton}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.formContainer}>
            {!confirmation ? (
              <>
                <FormField
                  title="Phone"
                  value={form.phone}
                  placeholder="Phone Number without code"
                  handleChangeText={e => setForm({ ...form, phone: e })}
                />
                {errorText ? (
                  <Text style={styles.errorText}>{errorText}</Text>
                ) : null}
                <TouchableOpacity onPress={handlePhoneLoginSignup} style={styles.loginButton}>
                  <Text style={[styles.buttonText, { color: theme.colors.text }]}>
                    Send OTP
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <FormField
                  title="OTP"
                  value={form.otp}
                  placeholder="Enter OTP"
                  handleChangeText={e => setForm({ ...form, otp: e })}
                />
                {errorText ? (
                  <Text style={styles.errorText}>{errorText}</Text>
                ) : null}
                <TouchableOpacity onPress={handleOTPVerification} style={styles.loginButton}>
                  <Text style={[styles.buttonText, { color: theme.colors.text }]}>
                    Verify OTP
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignIn;

const styles = StyleSheet.create({
  safearea: {
    flexGrow: 1,
  },

  togglecontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    padding: 20,
    marginBottom:20,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    // alignItems:'center',
    padding: 20,
  },
  formContainer: {
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#1E1E2D',
  },

  loginButton: {
    marginVertical: 20,
    elevation: 8,
    backgroundColor: '#fbc02d',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  googleButton: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    elevation: 8,
    backgroundColor: '#db4437',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    color: '#CDCDE0',
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
